package com.swrd1337.game;

import com.swrd1337.game.controllers.GameController;
import com.swrd1337.game.models.BoardStatus;
import com.swrd1337.game.models.ConnectionStatus;
import com.swrd1337.game.models.PlayerDetails;
import com.swrd1337.game.models.PlayerMove;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class GameControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private GameController controller;

    @Test
    public void testUserValidation() throws Exception {
        MvcResult result = mockMvc
                .perform(get("/check/valid?username=vali"))
                .andExpect(status().isOk())
                .andReturn();
        Assertions.assertEquals("true", result.getResponse().getContentAsString());
    }

    @Test
    public void testGetCurrentUser() throws Exception {
        controller.connect("alexei");
        PlayerDetails currentPlayer = controller.getCurrentPlayer("alexei");
        Assertions.assertEquals("alexei", currentPlayer.getUsername());
        Assertions.assertEquals("#b83939", currentPlayer.getColor());
    }

    @Test
    public void testConnect() throws Exception {
        ConnectionStatus connectionStatus = controller.connect("vali");
        Assertions.assertEquals(1, connectionStatus.getPlayersNumber());
        Assertions.assertEquals("vali", connectionStatus.getUsername());
        Assertions.assertEquals(false, connectionStatus.isDisconnected());

        connectionStatus = controller.connect("alexei");
        Assertions.assertEquals(2, connectionStatus.getPlayersNumber());
        Assertions.assertEquals("alexei", connectionStatus.getUsername());
        Assertions.assertEquals(false, connectionStatus.isDisconnected());
    }

    @Test
    public void testBoard() throws Exception {
        controller.connect("alexei");
        PlayerDetails alexei = controller.getCurrentPlayer("alexei");
        String alexeiColor = alexei.getColor();

        controller.connect("vali");
        PlayerDetails vali = controller.getCurrentPlayer("vali");
        String valiColor = vali.getColor();

        BoardStatus board1 = controller.board(
                new PlayerMove("doubleMove", "alexei", 2, 2, alexeiColor));
        BoardStatus board2 = controller.board(
                new PlayerMove("doubleMove", "alexei", 2, 2, alexeiColor));
        Assertions.assertEquals(board1, board2);

        board1 = controller.board(
                new PlayerMove(null, "vali", 5, 2, valiColor));
        board2 = controller.board(
                new PlayerMove(null, "alexei", 2, 2, valiColor));
        Assertions.assertEquals(board1, board2);
    }
}
