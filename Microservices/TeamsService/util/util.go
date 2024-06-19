package util

func RenameKeysWithSuffix(data map[string]interface{}, suffix string) map[string]interface{} {
	result := make(map[string]interface{})
	for key, value := range data {
		result[key+suffix] = value
	}
	return result
}