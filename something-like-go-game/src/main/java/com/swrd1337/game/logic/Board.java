package com.swrd1337.game.logic;

import com.swrd1337.game.models.PlayerDetails;
import com.swrd1337.game.models.PlayerMove;
import lombok.Data;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Board model and logic.
 */
@Data
public class Board {

    /**
     * Default colors.
     */
    public static final String[] COLORS = {
            "#808080" /*GRAY*/,
            "#b83939" /*RED*/,
            "#37a644" /*GREEN*/,
            "#3c59ab" /*BLUE*/,
            "#822e7a" /*PURPLE*/,
            "#ff87f4", /*PINK*/
    };

    /**
     * Default row number.
     */
    private static final int SIZE_ROW = 6;

    /**
     * Default col number.
     */
    private static final int SIZE_COL = 10;

    /**
     * Board itself.
     */
    private String[][] gameBoard;

    /**
     * Used to get random position for first movement.
     */
    private Random random;

    /**
     * Constructor.
     * @param defaultColorIndex Starting color.
     */
    public Board(int defaultColorIndex) {
        this.random = new Random();
        this.gameBoard = new String[SIZE_ROW][SIZE_COL];
        for (int i = 0; i < SIZE_ROW; i++) {
            for (int j = 0; j < SIZE_COL; j++) {
                this.gameBoard[i][j] = COLORS[defaultColorIndex];
            }
        }
    }

    /**
     * @return <code>true</code> if table has no empty cells.
     */
    public boolean isFull() {
        boolean isFull = true;
        for (int i = 0; i < SIZE_ROW; i++) {
            for (int j = 0; j < SIZE_COL; j++) {
                if (gameBoard[i][j].equals(COLORS[0])) {
                    isFull = false;
                    break;
                }
            }
            if (!isFull) {
                break;
            }
        }
        return isFull;
    }

    /**
     * Check if player can move.
     * @param playerMove Player's move details.
     * @return <code>true</code> if player can move.
     */
    public boolean canMove(PlayerMove playerMove) {
        boolean canMove = false;
        PlayerMove temp = new PlayerMove();
        temp.setColor(playerMove.getColor());
        for (int i = 0; i < SIZE_ROW; i++) {
            for (int j = 0; j < SIZE_COL; j++) {
               temp.setRowIndex(i);
               temp.setColIndex(j);
               canMove = isValidMove(temp);
               if (canMove) break;
            }
            if (canMove) break;
        }
        return canMove;
    }

    /**
     * @return Winner player's hex color.
     */
    public String getWinner() {
        Map<String, Integer> colorsPlace = new HashMap<>();
        for (int i = 1; i < COLORS.length; i++) {
            for (int j = 0; j < SIZE_ROW; j++) {
                for (int k = 0; k < SIZE_COL; k++) {
                    String hex = COLORS[i];
                    if (gameBoard[j][k].equals(hex)) {
                        if (colorsPlace.containsKey(hex)) {
                            colorsPlace.replace(hex, colorsPlace.get(hex) + 1);
                        } else {
                            colorsPlace.put(hex, 1);
                        }
                    }
                }
            }
        }
        int max = Collections.max(colorsPlace.values());
        List<String> winners = colorsPlace.entrySet().stream()
                .filter(e -> e.getValue() == max)
                .map(e -> e.getKey())
                .collect(Collectors.toList());

        return winners.get(0);
    }

    /**
     * Move action.
     * @param playerMove Player's move details.
     * @return <code>true</code> if movement position is valid.
     */
    public boolean move(PlayerMove playerMove) {
        boolean isValidMove = isValidMove(playerMove);
        if (isValidMove) {
            gameBoard[playerMove.getRowIndex()][playerMove.getColIndex()] = playerMove.getColor();
        }
        return isValidMove;
    }

    /**
     * Freedom move action.
     * @param playerMove Player's move details.
     * @return <code>true</code> if movement position is valid.
     */
    public boolean freedomMove(PlayerMove playerMove) {
        boolean isValidMove = isEmptyCell(playerMove);
        if (isValidMove) {
            gameBoard[playerMove.getRowIndex()][playerMove.getColIndex()] = playerMove.getColor();
        }
        return isValidMove;
    }

    /**
     * Substitution move action.
     * @param playerMove Player's move details.
     * @return <code>true</code> if movement position is valid.
     */
    public boolean substitutionMove(PlayerMove playerMove) {
        int rowIndex = playerMove.getRowIndex();
        int colIndex = playerMove.getColIndex();
        String selectedCell = gameBoard[rowIndex][colIndex];
        boolean isValidMove = isNearBy(playerMove);
        if (isValidMove
                && !selectedCell.equals(COLORS[0])
                && !selectedCell.equals(playerMove.getColor())
                && getEnemyStatus(selectedCell) > 1) {
            gameBoard[rowIndex][colIndex] = playerMove.getColor();
        } else {
            isValidMove = false;
        }
        return isValidMove;
    }

    /**
     * Count enemy cells.
     * @param color The given enemy color.
     * @return Nr of enemy cells.
     */
    private int getEnemyStatus(String color) {
        int enemyColors = 0;
        for (int i = 0; i < SIZE_ROW; i++) {
            for (int j = 0; j < SIZE_COL; j++) {
               if (gameBoard[i][j].equals(color)) {
                   enemyColors++;
               }
            }
        }
        return enemyColors;
    }

    /**
     * Execute first move for the player.
     * @param playerMove Player's move details.
     */
    public void firstMove(PlayerMove playerMove) {
        playerMove.setRowIndex(random.nextInt(SIZE_ROW));
        playerMove.setColIndex(random.nextInt(SIZE_COL));
        while (!isEmptyCell(playerMove)) {
            playerMove.setRowIndex(random.nextInt(SIZE_ROW));
            playerMove.setColIndex(random.nextInt(SIZE_COL));
        }
        gameBoard[playerMove.getRowIndex()][playerMove.getColIndex()] = playerMove.getColor();
    }

    /**
     * @param playerMove Player's move details.
     * @return <code>true</code> if selected position is valid.
     */
    private boolean isValidMove(PlayerMove playerMove) {
        if (isEmptyCell(playerMove)) {
            return isNearBy(playerMove);
        }
        return false;
    }

    /**
     * Check if player's move position is near by his cells.
     * @param playerMove Player's move details.
     * @return <code>true</code> if is near by.
     */
    private boolean isNearBy(PlayerMove playerMove) {
        int rowIndex = playerMove.getRowIndex();
        int colIndex = playerMove.getColIndex();
        if (rowIndex + 1 < SIZE_ROW && gameBoard[rowIndex + 1][colIndex].equals(playerMove.getColor())) {
            return true;
        } else if (rowIndex - 1 >= 0 && gameBoard[rowIndex - 1][colIndex].equals(playerMove.getColor())) {
            return true;
        } else if (colIndex + 1 < SIZE_COL && gameBoard[rowIndex][colIndex + 1].equals(playerMove.getColor())) {
            return true;
        } else if (colIndex - 1 >= 0 && gameBoard[rowIndex][colIndex - 1].equals(playerMove.getColor())) {
            return true;
        }
        return false;
    }

    /**
     * @param playerMove Player's move details.
     * @return <code>true</code> if selected board-cell is empty (default color).
     */
    private boolean isEmptyCell(PlayerMove playerMove) {
        int rowIndex = playerMove.getRowIndex();
        int colIndex = playerMove.getColIndex();
        if (gameBoard[rowIndex][colIndex].equals(COLORS[0])) {
            return true;
        }
        return false;
    }

    /**
     * Undo all player movements.
     * @param playerDetails Selected player details.
     */
    public void undo(PlayerDetails playerDetails) {
        String color = playerDetails.getColor();
        for (int i = 0; i < SIZE_ROW; i++) {
            ArrayList<String> row = new ArrayList<>();
            for (int j = 0; j < SIZE_COL; j++) {
                if (gameBoard[i][j].equals(color)) {
                    gameBoard[i][j] = COLORS[0];
                }
            }
        }
    }
}
