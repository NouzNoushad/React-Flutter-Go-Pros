package utils

import "strconv"

// string to bool
func StringToBool(value string) (bool, error) {
	return strconv.ParseBool(value)
}
