package mail.chief.view.comps;

import javafx.scene.control.TextArea;
import mail.chief.view.App;

/**
 * Mail's content view.
 */
public class MailView {
    // MailView instance.
    private static MailView mailView = new MailView();

    // TextArea for content.
    private TextArea textArea;

    /**
     * Return MailView instance.
     * @return
     */
    public static MailView getInstance() {
        return mailView;
    }

    /**
     * MailView Constructor.
     */
    private MailView() {
        this.textArea = new TextArea();

        textArea.setEditable(false);
        textArea.prefWidthProperty().bind(App.getAppStage().widthProperty());
    }

    /**
     * Return TextArea.
     * @return
     */
    public TextArea getTextArea() {
        return textArea;
    }

    /**
     * Setting content to TextArea.
     * @param content
     */
    public void setMailContent(String content) {
        textArea.setText(content);
    }
}
