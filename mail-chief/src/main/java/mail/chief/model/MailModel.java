package mail.chief.model;

import org.jsoup.Jsoup;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

/**
 * Mail Model.
 */
public class MailModel {
    // Where we store every mail content.
    private String subject;
    private String sender;
    private String message;
    private InputStream content;

    /**
     * MailModel Constructor with InputStream.
     * @param subject
     * @param sender
     * @param content
     */
    public MailModel(String subject, String sender, InputStream content) {
        this.subject = subject;
        this.sender = sender;
        this.content = content;
    }

    /**
     * Simple MailModel Constructor.
     * @param subject
     * @param sender
     * @param message
     */
    public MailModel(String subject, String sender, String message) {
        this.subject = subject;
        this.sender = sender;
        this.message = message;
    }

    /**
     * Return Subject.
     * @return
     */
    public String getSubject() {
        return subject;
    }

    /**
     * Return Sender.
     * @return
     */
    public String getSender() {
        return sender;
    }

    /**
     * Return Message.
     * @return
     */
    public String getMessage() {
        return message;
    }

    /**
     * Return Content from InputStream as String.
     * @return
     */
    public String getContent() {
        String localContent = new BufferedReader(new InputStreamReader(content))
                .lines().parallel().collect(Collectors.joining("&&%&%"));
        message = getPreparedContent(localContent);
        return getPreparedMessageContent(message);
    }

    /**
     * Preparing content.
     * @param localContent
     * @return
     */
    private String getPreparedMessageContent(String localContent) {
        String text = Jsoup.parse(localContent, "ISO-8859-1").select("body").text();

        text = getString(text, "<", ">");

        String description = getSubject().concat("\n\n").concat(getSender()).concat("\n\n");

        text = text.replaceAll("&&%&%", "\n");
        text = text.replaceAll("=", "");
        text = text.replaceAll("E28099", "");

        return description.concat(text);
    }

    /**
     * Get updated String.
     * @param text
     * @param symbol
     * @param symbol1
     * @return
     */
    private String getString(String text, String symbol, String symbol1) {
        while (text.contains(symbol) && text.contains(symbol1)) {
            int start = text.indexOf(symbol);
            int end = text.indexOf(symbol1, start + 2) + 1;
            text = text.replace(text.substring(start, end), "");
        }
        return text;
    }

    /**
     * Preparing content.
     * @param localContent
     * @return
     */
    private String getPreparedContent(String localContent) {
        if (localContent.contains("<html")) {
            localContent = localContent.substring(localContent.indexOf("<html"));
        }

        return localContent;
    }
}
