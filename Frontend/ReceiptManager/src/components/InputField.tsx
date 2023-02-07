import React, {useState} from 'react';
import { TextInput, View, StyleSheet, ViewStyle } from 'react-native';

// import { Container } from './styles';

type InputProps = {
    placeholder: string;
    money?: boolean;
    password?: boolean;
    email?: boolean;
    handler: (_:any) => void;
    placeHolderColor?: string;
    customStyle?: ViewStyle
}
const InputField: React.FC<InputProps> = ({placeholder, money = false, handler, password = false, email = false, placeHolderColor = "#C7C7CD",customStyle}) => {
    const [currValue, setCurrValue] = useState('');
    const spaces = 15;

    const formatMoney = (input: string) => {
        var original = input.replace(/[^0-9]+/g, '');
        let size = original.length;
        let begin = original.slice(0, size-2);
        let end = original.slice(size-2);
        let result = `${begin}.${end}`;
        let final_result = `$ ${result.padStart(spaces)}`;
        handler(parseFloat(result));
        setCurrValue(final_result)
    }

    const onChange = (input:string) => {
        setCurrValue(input);
         handler(input);
    }

    const reset = () => {
        if(currValue == `$ ${'.'.padStart(spaces)}`){
            setCurrValue('')
        }
    }
  return (
    <View style = {[styles.box, customStyle]}>
        <TextInput
            placeholderTextColor={placeHolderColor}
            autoCapitalize = {email ? 'none' : 'sentences'}
            secureTextEntry = {password}
            onChangeText={money ? formatMoney : onChange}
            value = {currValue}
            placeholder = {money ? `$ ${'0.00'.padStart(spaces)}` : placeholder}
            onBlur = {reset}
            keyboardType= {money ? "numeric" : 'default'}
            style = {[{backgroundColor: 'white'}, customStyle]}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    box: {
        margin: 10,
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'white'
    }
})
export default InputField;