# Author - Safiyyah Thur Rahman
# Purpose - Used to train the model used to predict the sentiment and Predict the Overall Sentiment of the App using SVM.SVR
# pip install csv, pickle, sklearn
import csv
import pickle
from math import floor
import os
import numpy as np
from sklearn.metrics import r2_score, mean_squared_error

# from Server_side.Data_Science.PreProcess import PreProcess
from PreProcess import PreProcess


class SentimentAnalysis:

    # used to train the machine learning model 
    # used for sentiment analysis using preprocessed 
    # reviews and the sentiment identified by the lexicon
    @staticmethod
    def train_svr():
        # file which contains the pre-processed reviews to train the model
        file = open('Data_Science/TrainingDataSet/LabelledData.csv', 'r')
        # all the records in the file are converted to a 2d array
        data = list(csv.reader(file, delimiter=','))
        # initializing 2 arrays one to store the preprocessed reviews
        # and the other to store the sentiments identified by the lexicon resource
        trainData = []
        trainLabel = []
        # # append the pre-processed the review and the sentiment, to trainData and trainLabel
        for j in range(len(data)):
            print(j)
            trainData.append(PreProcess.pre_process_review(data[j][0], "svr"))
            trainLabel.append(data[j][1])
        # upload the vectorizer from the file
        filename = 'Data_Science/MLModels/vectorizer.pk'
        count_vect = pickle.load(open(filename, 'rb'))
        # used to convert preprocessed reviews into a matrix of integers
        X_train_counts = count_vect.fit_transform(trainData)
        # store the vectorizer
        with open(filename, 'wb') as vec_file:
            pickle.dump(count_vect, vec_file)
        vec_file.close()
        # make a new model
        # loaded_model = svm.SVR()
        # load the model from file and train and store the model in the same file
        filename = 'Data_Science/MLModels/trained_model.sav'
        loaded_model = pickle.load(open(filename, 'rb'))
        # train the model
        loaded_model.fit(X_train_counts, trainLabel)
        # store the model
        pickle.dump(loaded_model, open(filename, 'wb'))

    @staticmethod
    def predict_sentiment(preprocessedReviews, testLabel):
        # the final sentiment score given by any app will be -2, -1, 0, 1, 2
        sentiment_score = [-2, -1, 0, 1, 2]
        # using the index the rating will be identified and 1 being the most negative and 5 being the most positive
        star_rating = [1, 2, 3, 4, 5]
        # overall sentiment score predicted by the model
        ovrll_sentiment = 0
        dirname = os.path.dirname(__file__)
        filename = os.path.join(dirname, 'MLModels/vectorizer.pk')
        # loads the vectorizer
        file = open(filename, 'rb')
        count_vect = pickle.load(file)
        file.close()
        # maps the words to document-term matrix.
        X_test_counts = count_vect.transform(preprocessedReviews)
        # save the vectorizer to the file
        with open(filename, 'wb') as vec_file:
            pickle.dump(count_vect, vec_file)
        vec_file.close()
        # load the model from the file
        filename = os.path.join(dirname, 'MLModels/trained_model.sav')
        file = open(filename, 'rb')
        loaded_model = pickle.load(file)
        file.close()
        # predict the scores using the model and the vectorized data
        predicted = loaded_model.predict(X_test_counts)
        # save the model
        file = open(filename, 'wb')
        pickle.dump(loaded_model, file)
        file.close()
        # add the predicted scores to ovrll_sentiment variable
        for k in range(len(predicted)):
            ovrll_sentiment += float(predicted[k])
        # multiply by 2 to get -2, -1, 0, 1 or 2
        senti_score = floor((ovrll_sentiment / len(preprocessedReviews)) * 2)
        # find the rating using the index of the calculated senti_score
        index = sentiment_score.index(senti_score)
        # convert the predicted list to an array
        predicted = np.array(predicted)
        # used to identify the confindence of the model
        r2_score_value = r2_score(testLabel, predicted)
        # used to identify the confindence of the model
        mean_squared_error_value = mean_squared_error(testLabel, predicted)
        # the rating is identified using the array star_rating and index
        rating = star_rating[index]
        return {'overall_sentiment': ovrll_sentiment, 'predicted': predicted, 'rating': rating,
                'r2_score': r2_score_value,
                'mean_square_error': mean_squared_error_value}
