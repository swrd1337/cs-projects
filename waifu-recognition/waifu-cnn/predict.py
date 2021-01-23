
from kawai_cnn import Net
from kawai_cnn import classes
from load_data import transform
import torch
import torchvision
import matplotlib.pyplot as plot
import numpy as np


pred_set = torchvision.datasets.ImageFolder(
    root='prediction', 
    transform=transform
)

pred_loader = torch.utils.data.DataLoader(
    pred_set, 
    batch_size=1, 
    shuffle=False, 
    num_workers=2
)


model = Net()
model.load_state_dict(torch.load('./models/waifu'))
model.eval()


def imshow(img):
    img = img / 2 + 0.5
    np_image = img.numpy()
    plot.imshow(np.transpose(np_image, (1, 2, 0)))


def kawai_predict():
    data_iter = iter(pred_loader)
    images, lables = data_iter.next()
    outputs = model(images)
    _, predicted = torch.max(outputs, 1)

    print('\n\n========================= {} =========================\n\n'
                        .format(classes[predicted[0]]))
                        
    imshow(torchvision.utils.make_grid(images))

    return classes[predicted[0]]


def run():
    return kawai_predict()       


if __name__ == '__main__':
    prediction = run()
    plot.suptitle(prediction)
    plot.show()