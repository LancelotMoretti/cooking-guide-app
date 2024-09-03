import { BaseTextBox } from './BaseTextBox';
import { StyleSheet } from 'react-native';
import { TextBoxStyles, TextBoxTimeStyles,  TextBoxAmtStyles, TextBoxIngreStyles, TextBoxInstrStyles } from '@/styles/AddRecipe';

export class TextBox extends BaseTextBox {
    static defaultProps = {
        style: TextBoxStyles.input,
        outerStyle: TextBoxStyles.container,
    };
    render() {
        return super.render();
    }
}

export class TextBoxTime extends BaseTextBox {
    static defaultProps = {
        style: TextBoxTimeStyles.input,
        outerStyle: TextBoxTimeStyles.container
    };
    render() {
        return super.render();
    }
}

export class TextBoxAmt extends BaseTextBox {
    static defaultProps = {
        style: TextBoxAmtStyles.input,
        outerStyle: TextBoxAmtStyles.container,
    };
    render() {
        return super.render();
    }
}

export class TextBoxIngredient extends BaseTextBox {
    static defaultProps = {
        style: TextBoxIngreStyles.input,
        outerStyle: TextBoxIngreStyles.container,
    };
    render() {
        return super.render();
    }
}

export class TextBoxInstruction extends BaseTextBox {
    static defaultProps = {
        style: TextBoxInstrStyles.input,
        outerStyle: TextBoxInstrStyles.container,
    };
    render() {
        return super.render();
    }
}

export class TextBoxSearch extends BaseTextBox {
    render() {
        return super.render();
    }
}