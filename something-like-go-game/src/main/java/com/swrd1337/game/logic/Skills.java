package com.swrd1337.game.logic;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Game skills enum.
 */
@AllArgsConstructor
@Getter
public enum Skills {
    /**
     * Freedom player skill.
     */
    FREEDOM("freedom"),

    /**
     * Substitution player skill.
     */
    SUBSTITUTION("substitution"),

    /**
     * Double move player skill.
     */
    DOUBLE_MOVE("doubleMove");

    /**
     * Skill string value.
     */
    private String value;
}
