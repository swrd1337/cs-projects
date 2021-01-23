package com.swrd1337.game.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Player's move details on the game board.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayerMove {

    /**
     * Current active skill, if skill == <code>null</code> is default move.
     */
    private String activeSkill;

    /**
     * The given player name.
     */
    private String username;

    /**
     * Row position.
     */
    private int rowIndex;

    /**
     * Column position.
     */
    private int colIndex;

    /**
     * The given user color (Hex).
     */
    private String color;

}
