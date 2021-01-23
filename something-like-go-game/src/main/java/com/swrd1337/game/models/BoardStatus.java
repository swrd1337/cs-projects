package com.swrd1337.game.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Game board status.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardStatus {

    /**
     * Player with current move priority.
     */
    private String currentPlayer;

    /**
     * Populated game board.
     */
    private String[][] board;

    /**
     * Winner player, <code>null</code> in case table still has empty cells.
     */
    private String winner;

}
