package com.swrd1337.game.models;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Current player details.
 */
@Data
@AllArgsConstructor
public class PlayerDetails {

    /**
     * The given username.
     */
    private String username;

    /**
     * Selected player color.
     */
    private String color;

    /**
     * Player move position in queue.
     */
    private int position;

    /**
     * Double move skill is active.
     */
    private boolean doubleMove;

    /**
     * Substitution skill is active.
     */
    private boolean substitution;

    /**
     * Freedom skill is active.
     */
    private boolean freedom;

}
