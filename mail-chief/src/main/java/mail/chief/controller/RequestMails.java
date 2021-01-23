package mail.chief.controller;

import mail.chief.model.credentials.MailCredentialsException;
import mail.chief.controller.abstractions.MailsFetcher;
import mail.chief.model.MailModel;
import mail.chief.model.MailsListModel;

import javax.mail.*;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Request Mails from Mail-account.
 */
public class RequestMails implements MailsFetcher<MailsListModel> {
    // Local Constants.
    private static final String IMAPS_PROTOCOL = "imaps";
    private static final String INBOX_FOLDER = "INBOX";

    // Model and Auth-instance.
    private MailsListModel preparedMails;
    private  MailAuthentication mailAuthentication;

    /**
     * RequestMails Constructor.
     * @param mailAuthentication
     */
    public RequestMails(MailAuthentication mailAuthentication) {
        this.preparedMails = new MailsListModel();
        this.mailAuthentication = mailAuthentication;
    }

    /**
     * Return prepared mails as MailsListModel.
     * @return
     * @throws MailCredentialsException
     */
    @Override
    public MailsListModel getPreparedMails() throws MailCredentialsException{
        try {
            requestMails(mailAuthentication.login());
        } catch (Exception e) {
            throw new MailCredentialsException(e.getMessage());
        }

        return  preparedMails;
    }

    /**
     * Request all mails from Mail-account Store.
     * @param session
     * @throws Exception
     */
    private void requestMails(Session session) throws Exception{
        Store store = session.getStore(IMAPS_PROTOCOL);
        store.connect();

        Folder mailFolder = store.getFolder(INBOX_FOLDER);
        mailFolder.open(Folder.READ_ONLY);

        prepareAllMails(mailFolder.getMessages());
        // TODO is time to do something with this part...
        //mailFolder.close(false);
        //store.close();
    }

    /**
     * Mails preparation before return.
     * @param messages
     * @throws MessagingException
     * @throws IOException
     */
    private void prepareAllMails(Message[] messages) throws MessagingException, IOException {
        int counter = 1;

        List<Message> list = Arrays.asList(messages);
        Collections.reverse(list);

        for (Message message : list) {
            String subject = message.getSubject();
            String sender = message.getFrom()[0].toString();
            InputStream content = message.getInputStream();

            MailModel localMail = new MailModel(subject, sender, content);
            preparedMails.addMailModel(Integer.toString(counter++), localMail);
        }
    }
}
