import pandas as pd
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.ensemble import VotingClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.discriminant_analysis import StandardScaler
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GridSearchCV, cross_val_score, train_test_split
from xgboost import XGBClassifier

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

def gradientBoostingEnsemble(X_train_selected, X_test_selected, y_train, y_test):
    gbc = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)
    gbc.fit(X_train_selected, y_train)
    gbc_pred = gbc.predict(X_test_selected)
    print("Gradient Boosting Accuracy:", accuracy_score(y_test, gbc_pred))

def xgBoostEnsemble(X_train_selected, X_test_selected, y_train, y_test):
    xgb = XGBClassifier(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)
    xgb.fit(X_train_selected, y_train)
    xgb_pred = xgb.predict(X_test_selected)
    print("XGBoost Accuracy:", accuracy_score(y_test, xgb_pred))

def main():
    processedData = processData()
    gradientBoostingEnsemble(*processedData)
    xgBoostEnsemble(*processedData)


main()