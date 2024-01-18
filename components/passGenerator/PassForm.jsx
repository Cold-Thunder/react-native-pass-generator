import React, { useState, useEffect } from "react"
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Pressable,
    Button,
    useWindowDimensions
} from "react-native"

import * as Yup from "yup"
import { Form, Formik, useFormik } from "formik"
import BouncyCheckbox from "react-native-bouncy-checkbox"

const formValid = Yup.object().shape({
    passwordLen: Yup.number().min(4, "Should be length of 4 Cahracter")
        .max(16, "should be length of 16 character")
        .required("Should be required!")
})

const PassForm = () => {

    const [password, setPassword] = useState('')
    const [isPassGener, setIsPassGener] = useState(false)
    const [number, setNumber] = useState(true)
    const [lowerLetter, setLowerLetter] = useState(false)
    const [upperLetter, setUpperLetter] = useState(false)
    const [symboles, setSymboles] = useState(false)

    const generatedPassString = (passLen) => {
        let charList = '';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const lowercase = 'abcdefghijklmnopqrstuvwxyz'
        const digit = '0123456789'
        const symbole = '!@#$%^&*()'
        if (number) {
            charList += digit
        }
        if (upperLetter) {
            charList += uppercase
        }
        if (lowerLetter) {
            charList += lowercase
        }
        if (symboles) {
            charList += symbole
        }
        const passWord = createPass(charList, passLen);
        setPassword(passWord)
        setIsPassGener(true)
    }

    const createPass = (characters, passLen) => {
        let result = ''
        for (let i = 0; i < passLen; i++) {
            const characterInd = Math.round(Math.random() * characters.length);
            result += characters.charAt(characterInd);
        }
        return result;
    }

    const resetPass = () => {
        setPassword('')
        setNumber(true)
        setUpperLetter(false)
        setLowerLetter(false)
        setSymboles(false)
        setIsPassGener(false);
    }

    const height = useWindowDimensions().height;
    const width = useWindowDimensions().width;
    return (
        <View style={[styles.container, { width: width, height: height }]}>
            <Text style={styles.title}>Password Generator</Text>
            <View style={styles.passGenerator}>
                <View style={[styles.formSection]}>
                    <Formik initialValues={{ passwordLen: '' }} validationSchema={formValid} onSubmit={values => generatedPassString(parseInt(values.passwordLen))}>
                        {
                            ({ isValid, values, errors, touched, handleChange, handleSubmit, handleReset }) => (
                                <View>
                                    <View>
                                        <Text style={styles.inputTitle}>Password Length:</Text>
                                        <TextInput style={styles.inputSec} name="passlen" onChangeText={handleChange('passwordLen')} value={values.passwordLen} placeholder="Ex-8" keyboardType="numeric"></TextInput>
                                        {touched.passwordLen && errors.passwordLen && (
                                            <Text style={styles.errorText}>{errors.passwordLen}</Text>
                                        )}
                                    </View>
                                    <View style={styles.checkBoxs}>
                                        <View style={styles.inputWrapper}>
                                            <Text style={styles.checkText}>Include Numbers</Text>
                                            <BouncyCheckbox
                                                style={styles.checker}
                                                onPress={() => setNumber(!number)}
                                                isChecked={number}
                                                fillColor="blue"
                                            />
                                        </View>
                                        <View style={styles.inputWrapper}>
                                            <Text style={styles.checkText}>Include Lowercase</Text>
                                            <BouncyCheckbox
                                                style={styles.checker}
                                                onPress={() => setLowerLetter(!lowerLetter)}
                                                isChecked={lowerLetter}
                                                fillColor="#29Ab87"
                                            />
                                        </View>
                                        <View style={styles.inputWrapper}>
                                            <Text style={styles.checkText}>Include UpperCase</Text>
                                            <BouncyCheckbox
                                                style={styles.checker}
                                                onPress={() => setUpperLetter(!upperLetter)}
                                                isChecked={upperLetter}
                                                fillColor="#C9A0DC"
                                            />
                                        </View>
                                        <View style={styles.inputWrapper}>
                                            <Text style={styles.checkText}>Include symboles</Text>
                                            <BouncyCheckbox
                                                style={styles.checker}
                                                onPress={() => setSymboles(!symboles)}
                                                isChecked={symboles}
                                                fillColor="#FC80A5"
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.btns}>
                                        <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                                            <View style={styles.btn}>
                                                <Text style={styles.btnText}>Generate Pass</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { handleReset(), resetPass() }}>
                                            <View style={[styles.btn, { backgroundColor: "red" }]}>
                                                <Text style={[styles.btnText, { color: "white" }]}>Reset</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }
                    </Formik>
                </View>

                <View style={styles.passShowSec}>
                    {
                        isPassGener && (
                            <View style={styles.passShow}>
                                <Text>Long press to select</Text>
                                <Text selectable={true} style={styles.passText}>{password}</Text>
                            </View>
                        )
                    }
                </View>
            </View>

        </View>
    )
}
export default PassForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        textAlign: "center",
        paddingTop: 30,
        fontSize: 28,
        fontWeight: "bold",
        color: "black"
    },
    passGenerator: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    formSection: {
        justifyContent: 'center',
        alignItems: "center",
        width: "95%",
        marginVertical: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "#555",
        borderRadius: 10,
        elevation: 3
    },
    inputTitle: {
        marginVertical: 10,
        fontSize: 16,
        color: "white",
        fontSize: 18
    },
    inputSec: {
        height: 40,
        width: 300,
        paddingHorizontal: 10,
        borderColor: "#999",
        borderWidth: 1,
        borderRadius: 5,
        color: "#ddd",
        fontSize: 18
    },
    errorText: {
        fontSize: 16,
        color: "red",

    },
    inputWrapper: {
        flexDirection: "row",
        marginVertical: 10,
    },
    checkBoxs: {
        marginTop: 30
    },
    checkText: {
        width: "85%",
        color: 'white',
        fontSize: 16
    },
    checker: {
        width: "10%",
    },

    btns: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    btn: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
        marginHorizontal: 10,
        height: 40,
        width: 130,
        backgroundColor: "skyblue",
        borderRadius: 7,
        elevation: 3
    },
    btnText: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16
    },
    passShowSec: {
        justifyContent: "center",
        alignItems: "center",
        width: "95%"
    },
    passShow: {
        justifyContent: "center",
        alignItems: "center",
        height: 80,
        width: "100%",
        backgroundColor: "skyblue",
        borderRadius: 10,
        elevation: 3
    },
    passText: {
        fontSize: 23,
        color: "black",
        fontWeight: "bold"
    }
})