import torch
import torchvision
import torchvision.transforms as transforms

import torch.nn as nn
import torch.optim as optim

from kawai_cnn import Net, classes

model = Net()

transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(), 
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
    ])

train_set = torchvision.datasets.ImageFolder(
    root='kawai-data', 
    transform=transform
    )

test_set = torchvision.datasets.ImageFolder(
    root='test', 
    transform=transform
    )

train_loader = torch.utils.data.DataLoader(
    train_set, 
    batch_size=1, 
    shuffle=True, 
    num_workers=2
    )

test_loader = torch.utils.data.DataLoader(
    test_set, 
    batch_size=1, 
    shuffle=True, 
    num_workers=2
    )
