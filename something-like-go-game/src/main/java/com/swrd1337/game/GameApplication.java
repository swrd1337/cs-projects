package com.swrd1337.game;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Something like GO game server.
 */
@SpringBootApplication
public class GameApplication {

	/**
	 * Entry point of application.
	 * @param args
	 */
	public static void main(String[] args) {
		SpringApplication.run(GameApplication.class, args);
	}

}
