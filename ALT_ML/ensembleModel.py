import pandas as pd
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import VotingClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.discriminant_analysis import StandardScaler
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV, cross_val_score, train_test_split


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

    # Feature selection
    selector = SelectKBest(f_classif, k=100)  # You can adjust k based on your preference
    X_train_selected = selector.fit_transform(X_train_scaled, y_train)
    X_test_selected = selector.transform(X_test_scaled)

    return X_train_selected, X_test_selected, y_train, y_test

def logisticRegressionModel(X_train_selected, X_test_selected, y_train, y_test):
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

    # # Evaluate model on test set
    # y_pred = best_model.predict(X_test_selected)
    # test_accuracy = accuracy_score(y_test, y_pred)
    # print(f'Grid Search Test Accuracy: {test_accuracy:.4f}')

    # # Cross-validation
    # cv_scores = cross_val_score(best_model, X_train_selected, y_train, cv=5)
    # print(f'Cross-validated Accuracy: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}')
    return best_model
    
def randomForestModel(X_train_selected, X_test_selected, y_train, y_test):
    # Define the parameter grid for GridSearchCV
    param_grid = {
        'n_estimators': [100, 200, 300],  # Number of trees in the forest
        'max_features': ['auto', 'sqrt', 'log2'],  # Number of features to consider at every split
        'max_depth': [10, 20, 30, None],  # Maximum number of levels in the tree
        'min_samples_split': [2, 5, 10],  # Minimum number of samples required to split a node
        'min_samples_leaf': [1, 2, 4],  # Minimum number of samples required at each leaf node
        'bootstrap': [True, False]  # Method of selecting samples for training each tree
    }

    # Create a RandomForestClassifier model
    rf = RandomForestClassifier(random_state=42)

    # Initialize GridSearchCV
    grid_search = GridSearchCV(estimator=rf, param_grid=param_grid, cv=5, n_jobs=-1, scoring='accuracy')

    # Fit GridSearchCV
    grid_search.fit(X_train_selected, y_train)

    # Best model from GridSearchCV
    best_rf_model = grid_search.best_estimator_
    print(f'Best parameters: {grid_search.best_params_}')

    # # Evaluate the best model on the test set
    # y_pred = best_rf_model.predict(X_test_selected)
    # test_accuracy = accuracy_score(y_test, y_pred)
    # print(f'Grid Search Test Accuracy: {test_accuracy:.4f}')
    return best_rf_model

def svmModel(X_train_selected, X_test_selected, y_train, y_test):
    param_grid = {
        'C': [0.1, 1, 10, 100],
        'gamma': [1, 0.1, 0.01, 0.001],
        'kernel': ['linear', 'rbf', 'poly']
    }

    svm = SVC()

    # Perform grid search with cross-validation
    grid_search = GridSearchCV(estimator=svm, param_grid=param_grid, refit=True, cv=5)
    grid_search.fit(X_train_selected, y_train)

    # Print the best parameters and the best score
    # print(f"Best Parameters: {grid_search.best_params_}")
    # print(f"Best Cross-validation Score: {grid_search.best_score_}")

    # Evaluate the best model on the test set
    best_model = grid_search.best_estimator_
    return best_model

def evaluate_model(model, X_test, y_test):
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred)
    return accuracy, report

def main():
    processedData = processData()
    # print("Logistic Regression--------------")
    # logisticRegressionModel(*processedData)
    # print("Random Forest--------------------")
    # randomForestModel(*processedData)
    ensembleModel = VotingClassifier(estimators=[
        ('lr', logisticRegressionModel(*processedData)),
        # ('rf', randomForestModel(*processedData)),
        ('svm', svmModel(*processedData)),
    ], voting='soft')

    x_train = processedData[0]
    x_test = processedData[1]
    y_train = processedData[2]
    y_test = processedData[3]

    ensembleModel.fit(x_train, y_train)
    accuracy, report = evaluate_model(ensembleModel, x_test, y_test)

    # Print the results
    print(f"Accuracy: {accuracy}")
    print("Classification Report:")
    print(report)

main()