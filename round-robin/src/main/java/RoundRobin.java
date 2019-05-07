import java.util.ArrayDeque;
import java.util.Queue;
import java.util.Random;
import java.util.Scanner;

public class RoundRobin {
    private static final int PROCESSES = 1000;
    private int BOUND = 100;
    private int QUANTUM = 10;

    private class Process {
        private int pid;
        private int burstTime;
        private int remTime;
        private int waitingTime;

        Process(int pid, int burstTime) {
            this.pid = pid;
            this.burstTime = burstTime;
            this.remTime = burstTime;
        }

        @Override
        public String toString() {
            return "\n[ID: " + pid + "; Burst: " + burstTime
                    + "; Remaining: " + remTime + "; Waiting time: " + waitingTime + "]\n";
        }
    }

    private boolean checkIfEnds(Queue<Process> queue) {
        boolean isZero = true;
        for (Process p : queue) {
            if (p.remTime > 0) {
                isZero = false;
                break;
            }
        }
        return isZero;
    }

    private void roundRobin(Queue<Process> queue) {
        int time = 0;
        boolean isDone = false;
        // Parse all processes
        while (!isDone) {
            isDone = true;
            if (!checkIfEnds(queue)) {
                Process current = queue.poll();
                isDone = false;
                if (current != null && current.remTime > QUANTUM) {
                    time += QUANTUM;
                    current.remTime -= QUANTUM;
                } else {
                    time += current.remTime;
                    current.waitingTime = time - current.burstTime;
                    current.remTime = 0;
                }
                queue.add(current);
            }
        }
    }

    private void readFromKeyboard() {
        Scanner in = new Scanner(System.in);
        System.out.println("Enter quantum value: ");
        QUANTUM = in.nextInt();
        System.out.println("Enter burst time bound: ");
        BOUND = in.nextInt();
    }

    private void run() {
        readFromKeyboard();
        Random rand = new Random();
        Queue<Process> queue = new ArrayDeque<>();
        // Randomize processes values.
        for (int i = 0; i < PROCESSES; i++) {
            queue.add(new Process(i, rand.nextInt(BOUND)));
        }
        roundRobin(queue);
        System.out.println(queue);

        int waiting = 0;
        int turnAround = 0;
        while (!queue.isEmpty()) {
            Process p = queue.poll();
            waiting += p.waitingTime;
            turnAround += p.burstTime + p.waitingTime;
        }

        System.out.println(String.format("Average of waiting time is %d and turn around %d.",
                waiting / PROCESSES, turnAround / PROCESSES));
    }

    public static void main(String[] args) {
        new RoundRobin().run();
    }
}
