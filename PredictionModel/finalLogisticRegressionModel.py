import pandas as pd
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.discriminant_analysis import StandardScaler
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV, cross_val_score, train_test_split
from sklearn.pipeline import Pipeline
import pickle

def processData():
    file = 'FinalMasterData_updated.csv'
    data = pd.read_csv(file)

    # Split features and target
    X = data.drop(['W/L'], axis=1, inplace=False)
    y = data['W/L']

    # Split data into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=0.7, random_state=42)

    # Standardize features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # with open('pickle/scaler.pkl', 'wb') as scaler_file:
    #     pickle.dump(scaler, scaler_file)

    # Feature selection
    selector = SelectKBest(f_classif, k=50)  # You can adjust k based on your preference
    X_train_selected = selector.fit_transform(X_train_scaled, y_train)
    X_test_selected = selector.transform(X_test_scaled)
    
    # Get the boolean mask of the selected features
    selected_mask = selector.get_support()

    # Get the names of the selected features
    selected_features = X.columns[selected_mask]
    # print("Selected feature names:", selected_features)
    # with open("features.txt", "w") as file:
    #     for feature in selected_features:
    #         file.write(feature + "\n")

    return X_train_selected, X_test_selected, y_train, y_test

def logisticRegressionModelOptimizer(X_train_selected, X_test_selected, y_train, y_test):
    # Hyperparameter tuning with GridSearchCV
    param_grid = {
        'C': [0.01, 0.1, 1, 10, 100],
        'penalty': ['l1', 'l2'],
        'solver': ['liblinear']
    }

    grid_search = GridSearchCV(LogisticRegression(max_iter=1000), param_grid, cv=5, n_jobs=-1)
    grid_search.fit(X_train_selected, y_train)

    # Best model
    best_model = grid_search.best_estimator_
    print(f'Best parameters: {grid_search.best_params_}')

    # Evaluate model on test set
    y_pred = best_model.predict(X_test_selected)
    test_accuracy = accuracy_score(y_test, y_pred)
    print(f'Grid Search Test Accuracy: {test_accuracy:.4f}')

    # Cross-validation
    cv_scores = cross_val_score(best_model, X_train_selected, y_train, cv=5)
    print(f'Cross-validated Accuracy: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}')

def logisticRegressionModel(X_train_selected, X_test_selected, y_train, y_test):
    model = LogisticRegression(C=0.01, penalty='l1', solver='liblinear')
    model.fit(X_train_selected, y_train)
    y_pred = model.predict(X_test_selected)

    # Evaluate the model
    accuracy = accuracy_score(y_test, y_pred)
    print("Accuracy:", accuracy)

    # Print classification report
    print("Classification Report:")
    print(classification_report(y_test, y_pred))

    # Print confusion matrix
    print("Confusion Matrix:")
    print(confusion_matrix(y_test, y_pred))

    # with open('pickle/lr_model.pkl', 'wb') as model_file:
    #     pickle.dump(model, model_file)

def processDataPipeline():
    file = 'FinalMasterData_updated.csv'
    data = pd.read_csv(file)
    data = data.drop(['Unnamed: 0'], axis=1, inplace=False) #drop irrelevent column

    # Split features and target
    X = data.drop(['W/L'], axis=1, inplace=False)
    # print(X.columns.values)
    y = data['W/L']

    # Split data into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=0.7, random_state=42)
    return X_train, X_test, y_train, y_test

def lrModelPipeline(X_train, X_test, y_train, y_test):
    # Define the pipeline
    pipeline = Pipeline([
        ('scaler', StandardScaler()),            # Standardize the features
        ('feature_selection', SelectKBest(f_classif, k=50)),  # Select top 50 features
        ('logistic_regression', LogisticRegression(C=0.01, penalty='l1', solver='liblinear'))  # Logistic Regression model
    ])

    # Fit the pipeline on the training data
    pipeline.fit(X_train, y_train)
    # Evaluate the model on the test set
    score = pipeline.score(X_test, y_test)
    print(f"Model accuracy: {score}")

    with open('pickle/pipelineModel.pkl', 'wb') as scaler_file:
        pickle.dump(pipeline, scaler_file)

def main():
    processedData = processData()
    logisticRegressionModel(*processedData)

def pipelineProcess():
    processedData = processDataPipeline()
    lrModelPipeline(*processedData)

# main()
pipelineProcess()