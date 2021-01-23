package mail.chief.view.comps;

import javafx.scene.Node;
import javafx.scene.layout.GridPane;

/**
 * RootGrid where we put all components.
 */
public class RootGrid {
    // GridPane field.
    private GridPane gridPane;

    /**
     * RootGrid constructor.
     */
    public RootGrid() {
        gridPane = new GridPane();
    }

    /**
     * Add element to GridPane.
     * @param element
     * @param col
     * @param row
     */
    public void addElement(Node element, int col, int row) {
        gridPane.add(element, col, row, 1, 1);
    }

    /**
     * Return GridPane.
     * @return
     */
    public GridPane getGridPane() {
        return gridPane;
    }
}
