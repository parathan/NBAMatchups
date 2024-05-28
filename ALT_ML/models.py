import csv
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn import svm
from sklearn.metrics import accuracy_score
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.feature_selection import SelectKBest, f_classif

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam

def logisticRegressionModel():
    file = 'FinalMasterData_updated.csv'
    data = pd.read_csv(file)

    # x = data.drop(['W/L'], axis=1, inplace=False)
    # y = data['W/L']

    # X_train, X_test, y_train, y_test = train_test_split(x,y,train_size=0.7)
    
    # model = LogisticRegression(solver='liblinear', C=0.01, penalty='l1')
    # model.fit(X_train, y_train)
    # model.predict(X_test)
    # score = model.score(X_test, y_test)

    # print("Score:", score)
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

def logisticRegressionHomeCourt():
    file = 'FinalMasterDataHomeCourt_updated.csv'
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

def randomForestModel():
    file = 'FinalMasterData_updated.csv'
    data = pd.read_csv(file)

    # Split features and target
    X = data.drop(['W/L'], axis=1, inplace=False)  # Assuming 'W/L' is the target column
    y = data['W/L']

    # Split data into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=0.7, random_state=42)

    # Standardize features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Feature selection
    selector = SelectKBest(f_classif, k=50)  # Select top 50 features based on ANOVA F-value
    X_train_selected = selector.fit_transform(X_train_scaled, y_train)
    X_test_selected = selector.transform(X_test_scaled)

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
    grid_search = GridSearchCV(estimator=rf, param_grid=param_grid, cv=5, n_jobs=-1, verbose=2, scoring='accuracy')

    # Fit GridSearchCV
    grid_search.fit(X_train_selected, y_train)

    # Best model from GridSearchCV
    best_rf_model = grid_search.best_estimator_
    print(f'Best parameters: {grid_search.best_params_}')

    # Evaluate the best model on the test set
    y_pred = best_rf_model.predict(X_test_selected)
    test_accuracy = accuracy_score(y_test, y_pred)
    print(f'Grid Search Test Accuracy: {test_accuracy:.4f}')


def neuralNetModel():
    file = 'FinalMasterData_updated.csv'
    data = pd.read_csv(file)

    # Split features and target
    X = data.drop(['W/L'], axis=1, inplace=False)  # Assuming 'W/L' is the target column
    y = data['W/L']

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Standardize the features
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    # Build the neural network model
    model = Sequential()
    model.add(Dense(256, input_dim=X_train.shape[1], activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(128, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(64, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(1, activation='sigmoid'))

    # Compile the model
    model.compile(optimizer=Adam(learning_rate=0.001), loss='binary_crossentropy', metrics=['accuracy'])

    # Train the model
    history = model.fit(X_train, y_train, epochs=50, batch_size=32, validation_data=(X_test, y_test))

    # Evaluate the model
    loss, accuracy = model.evaluate(X_test, y_test)
    print(f'Test Accuracy: {accuracy:.4f}')

    # Make predictions
    y_pred = (model.predict(X_test) > 0.5).astype("int32")

    # Display a few predictions
    print(f'Predicted labels: {y_pred[:10].flatten()}')
    print(f'True labels: {y_test[:10].values}')


logisticRegressionModel()
# randomForestModel()
# neuralNetModel()
logisticRegressionHomeCourt()