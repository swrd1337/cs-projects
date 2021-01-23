from load_data import nn, torch, torchvision, test_loader, classes
from kawai_cnn import Net

model = Net()

model.load_state_dict(torch.load('./models/waifu'))
model.eval()


def kawai_test():
    model.eval()
    with torch.no_grad():
        correct = 0
        total = 0

        for images, labels in test_loader:
            outputs = model(images)
            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

        print('Accuracy: {} %'.format(100 * correct / total))
        fl = open('info.tx', 'w')
        fl.write('Accuracy: {} %'.format(100 * correct / total))


def run():
    kawai_test()        


if __name__ == '__main__':
    run()