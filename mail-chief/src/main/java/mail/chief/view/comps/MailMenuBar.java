package mail.chief.view.comps;

import javafx.application.Platform;
import javafx.scene.control.Menu;
import javafx.scene.control.MenuBar;
import javafx.scene.control.MenuItem;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import mail.chief.view.App;
import mail.chief.view.Titles;
import org.apache.log4j.Logger;

import java.awt.*;
import java.net.URL;

/**
 * Menu Bar.
 */
public class MailMenuBar {
    private static Logger logger = Logger.getLogger(MailSideBar.class.getName());

    // Project link.
    private static final String MAIL_CHIEF = "https://github.com/swrd1337/mail-chief";

    // Local MenuBar.
    private MenuBar menuBar;

    // MailMenuBar instance.
    private static MailMenuBar ourInstance = new MailMenuBar();

    /**
     * Return MailMenuBar instance.
     * @return
     */
    public static MailMenuBar getInstance() {
        return ourInstance;
    }

    /**
     * MailMenuBar Constructor.
     */
    private MailMenuBar() {
        menuBar = new MenuBar();
        menuBar.prefWidthProperty().bind(App.getAppStage().widthProperty());
        addItems();
    }

    /**
     * Return MenuBar.
     * @return
     */
    public MenuBar getMenuBar() {
        return menuBar;
    }

    /**
     * Add menu items.
     */
    private void addItems() {
        Menu options = new Menu(Titles.APP.toString());
        Menu help = new Menu(Titles.HELP.toString());

        options.getItems().add(createExitItem());
        help.getItems().add(createAboutItem());

        menuBar.getMenus().add(options);
        menuBar.getMenus().add(help);
    }

    /**
     * Return Exit MenuItem.
     * @return
     */
    private MenuItem createExitItem() {
        Image exitImg = new Image("icons/exit.png");
        ImageView exitView = new ImageView(exitImg);
        MenuItem exit = new MenuItem(Titles.EXIT.toString(), exitView);
        exit.setOnAction(event -> Platform.exit());

        return exit;
    }

    /**
     * Return About MenuItem.
     * @return
     */
    private MenuItem createAboutItem() {
        Image ourImg = new Image("icons/about-us.png");
        ImageView ourView = new ImageView(ourImg);
        MenuItem ourPage = new MenuItem(Titles.ABOUT.toString(), ourView);

        ourPage.setOnAction(event -> {
            try {
                Desktop.getDesktop().browse(new URL(MAIL_CHIEF).toURI());
            } catch (Exception e) {
                logger.error(e);
            }
        });

        return ourPage;
    }
}
