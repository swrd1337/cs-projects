package com.swrd1337.game.controllers;

import com.swrd1337.game.logic.Board;
import com.swrd1337.game.logic.Skills;
import com.swrd1337.game.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Game main HTTP controller.
 */
@Controller
public class GameController {

    /**
     * Players in-memory storage.
     */
    private Map<String, PlayerDetails> players;

    /**
     * Game board.
     */
    private Board board;

    /**
     * Current active move player index.
     */
    private int playerMovePosition;

    /**
     * Controller.
     */
    @Autowired
    public GameController() {
        this.board = new Board(0);
        this.players = new HashMap<>();
        this.playerMovePosition = 1;
    }

    /**
     * Check if user is valid to enter the game-room.
     * @param username User unique name.
     * @return <code>true</code> if user is valid to enter.
     */
    @GetMapping("/check/valid")
    @ResponseBody
    public boolean isValidToEnter(@RequestParam("username") String username) {
        return players.size() < 6 && !players.containsKey(username);
    }

    /**
     * @param username User unique name.
     * @return Current user details.
     */
    @GetMapping("/current")
    @ResponseBody
    public PlayerDetails getCurrentPlayer(@RequestParam("username") String username) {
        return players.get(username);
    }

    /**
     * Connect to the game Web-Socket stream.
     * @param username User unique name.
     * @return Addition info about connection.
     */
    @MessageMapping("/connect")
    @SendTo("/game/users")
    public ConnectionStatus connect(String username) {
        boolean disconnected = false;
        if (players.containsKey(username)) {
            disconnected = true;
            board.undo(players.get(username));
            players.remove(username);
            if (players.size() == 0) {
                board = new Board(0);
            }
            int startPos = 1;
            for (Map.Entry<String, PlayerDetails> p : players.entrySet()) {
                p.getValue().setPosition(startPos++);
            }
        } else if (players.size() <= 5) {
            int newPos = players.size() + 1;
            int colorIndex = -1;
            for (int i = 1; i < Board.COLORS.length; i++) {
                boolean colorIsAvaible = true;
                for (Map.Entry<String, PlayerDetails> p : players.entrySet()) {
                    if (p.getValue().getColor().equals(Board.COLORS[i])) {
                        colorIsAvaible = false;
                    }
                }
                if (colorIsAvaible) {
                    colorIndex = i;
                    break;
                }
            }
            players.put(username, new PlayerDetails(username, Board.COLORS[colorIndex], newPos, true, true, true));
        }
        return new ConnectionStatus(username, disconnected, players.size(), players.values());
    }

    /**
     * Connect to the game board Web-Socket stream and handle the logic.
     * @param playerMove Player move details.
     * @return Info about board and current player move.
     */
    @MessageMapping("/board")
    @SendTo("/game/board")
    public BoardStatus board(PlayerMove playerMove) {
        if (players.size() == 0) {
            board = new Board(0);
        } else if (playerMove.getColIndex() == -9) {
            return new BoardStatus(null, board.getGameBoard(), null);
        } else  {
            if (playerMove.getColIndex() == -1 && playerMove.getRowIndex() == -1) {
                PlayerMove firstMove = new PlayerMove();
                firstMove.setColor(players.get(playerMove.getUsername()).getColor());
                board.firstMove(firstMove);
            } else {
                boardMovement(playerMove);
            }
        }
        boolean full = board.isFull();
        if (full) {
            String winnerColor = board.getWinner();
            String username = null;
            for (Map.Entry<String, PlayerDetails> p : players.entrySet()) {
                if (p.getValue().getColor().equals(winnerColor)) {
                    username = p.getValue().getUsername();
                }
            }
            return new BoardStatus(getUserNameByCurrentPos(), board.getGameBoard(), username);
        } else {
                return new BoardStatus(getUserNameByCurrentPos(), board.getGameBoard(), null);
        }
    }

    /**
     * Execute board movement.
     * @param playerMove Player's move details.
     */
    private void boardMovement(PlayerMove playerMove) {
        PlayerDetails playerDetails = players.get(playerMove.getUsername());
        if (board.canMove(playerMove) || playerDetails.isFreedom() || playerDetails.isSubstitution()) {
            if (playerDetails != null && playerDetails.getPosition() == playerMovePosition && players.size() > 1) {
                boolean isValidMove;
                String activeSkill = playerMove.getActiveSkill();
                if (Skills.FREEDOM.getValue().equals(activeSkill) && playerDetails.isFreedom()) {
                    isValidMove = board.freedomMove(playerMove);
                    if (isValidMove) {
                        playerDetails.setFreedom(false);
                    }
                } else if (Skills.SUBSTITUTION.getValue().equals(activeSkill) && playerDetails.isSubstitution()) {
                    isValidMove = board.substitutionMove(playerMove);
                    if (isValidMove) {
                        playerDetails.setSubstitution(false);
                    }
                } else if (Skills.DOUBLE_MOVE.getValue().equals(activeSkill) && playerDetails.isDoubleMove()) {
                    isValidMove = board.move(playerMove);
                    if (isValidMove) {
                        playerDetails.setDoubleMove(false);
                        isValidMove = false;
                    }
                } else {
                    isValidMove = board.move(playerMove);
                }
                if (isValidMove) {
                    changePlayersTurn();
                    for (Map.Entry<String, PlayerDetails> p : players.entrySet()) {
                        int position = p.getValue().getPosition();
                        if (position == playerMovePosition) {
                            PlayerMove pm = new PlayerMove();
                            PlayerDetails details = p.getValue();
                            pm.setColor(details.getColor());
                            boolean canMove = board.canMove(pm);
                            if (!canMove && !details.isSubstitution() && !details.isFreedom()) {
                                changePlayersTurn();
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Increment turn variable.
     */
    private void changePlayersTurn() {
        if (playerMovePosition < players.size()) {
            playerMovePosition++;
        } else {
            playerMovePosition = 1;
        }
    }

    /**
     * @return Current available to move username.
     */
    private String getUserNameByCurrentPos() {
        String username = null;
        for (Map.Entry<String, PlayerDetails> p : players.entrySet()) {
            if (p.getValue().getPosition() == playerMovePosition) {
                username = p.getValue().getUsername();
            }
        }
        return username;
    }

}
