package mail.chief.view.comps;

import javafx.scene.Node;
import javafx.scene.layout.VBox;


/**
 * Mail Chief side bar.
 */
public class MailSideBar {
    // Local constants.
    private static final int SPACING = 5;
    private static final int MIN_WIDTH = 120;

    // MailSideBar instance.
    private static MailSideBar mailSideBar = new MailSideBar();

    // Side bar.
    private VBox sideBar;

    /**
     * Return MailSideBar instance.
     * @return
     */
    public static MailSideBar getInstance() {
        return mailSideBar;
    }

    /**
     * MailSideBar Constructor.
     */
    private MailSideBar() {
        this.sideBar = new VBox(SPACING);
        sideBar.setMinWidth(MIN_WIDTH);
    }

    /**
     * Put item in MailSideBar.
     * @param mailButton
     */
    public void putButtonInSideBar(Node mailButton) {
        sideBar.getChildren().add(mailButton);
    }

    /**
     * Return VBox side bar.
     * @return
     */
    public VBox getSideBar() {
        return sideBar;
    }
}
