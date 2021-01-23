# Waifu Recognition :octocat:

Image "waifu" classifier model developed using PyTorch (my first deep-learning project).

Is a simple CNN model with 4 convolutional layers trained to recognize anime girls images.

You can train this model on different classes (ex. dogs, cats) - is actually working.

## Getting Started

Clone this repository.

```
git clone https://github.com/swrd1337/waifu-recognition.git
```
<br/>

Copy train data to ``` waifu-recognition/waifu-cnn/kawai-data ```

and test to ``` waifu-recognition/waifu-cnn/kawai-data ```.

<br/>

After train the model (you can use already trained model).

``` 
python train.py
```

And test your trained model.

``` 
python test.py 
```

<br/>

**It's time to predict** :blush:

Load prediction image to ``` waifu-recognition/waifu-cnn/prediction/data ``` and type

```
python predict.py
```

or

```
npm run load "image url" 
```

```
npn run predict 
```

<br/>

## Built With

* [PyTorch](https://pytorch.org/) - An open source deep learning platform.

## Authors

* **Bunazov Alexei** - *Idea and development* - [swrd1337](https://github.com/swrd1337)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

