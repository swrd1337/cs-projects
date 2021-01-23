from load_data import model, train_loader, torch, nn


learning_rate = 0.00001

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

steps = len(train_loader)


def kawai_train():
    fl = open('info.txt', 'w')
    for epoch in range(50):
        for i, (images, labels) in enumerate(train_loader):
            output = model(images)
            loss = criterion(output, labels)

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            res = '"epoch" : {}, "step" : {}, "loss" : {} \n'.format(epoch, i, loss.item())
            print(res)
            fl.write(res)
            
    torch.save(model.state_dict(), './models/waifu')


def run():
    kawai_train()       


if __name__ == '__main__':
    run()