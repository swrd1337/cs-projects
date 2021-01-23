package com.swrd1337.game.models;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Collection;

/**
 * User connection status details.
 */
@Data
@AllArgsConstructor
public class ConnectionStatus {

    /**
     * The given username.
     */
    private String username;

    /**
     * <code>true</code> if was a disconnection action.
     */
    private boolean isDisconnected;

    /**
     * Total players number.
     */
    private int playersNumber;

    /**
     * List of connected players.
     */
    private Collection<PlayerDetails> connectedPlayers;
}
