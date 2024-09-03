import { BaseButton } from './BaseButton';
import { Image, StyleSheet } from 'react-native';
import { ButtonStyles } from '@/styles/AddRecipe';
import {ButtonAddStyles} from '@/styles/AddRecipe';
import { ButtonAddVideoStyles } from '@/styles/AddRecipe';
import { ButtonPublishStyles } from '@/styles/AddRecipe';
import { ButtonTrashStyles } from '@/styles/AddRecipe';
import { ButtonSearchStyles } from '@/styles/Search';
import { ButtonEditStyles } from '@/styles/RecipeDetail';

export class SignButton extends BaseButton {
    render() {
        return super.render();
    }
}

export class ButtonFirst extends BaseButton {
    static defaultProps = {
        containerStyle: ButtonStyles.container,
        style: ButtonStyles.text,
    };
    render() {
        return super.render();
    }
}

export class ButtonAdd extends BaseButton {
    static defaultProps = {
        containerStyle: ButtonAddStyles.container,
        style: ButtonAddStyles.text,
    };

    render() {
        // Optional: You can modify or add logic specific to ButtonAdd here
        return super.render(); // Uses the render method from BaseButton
    }
}

export class ButtonAddVideo extends BaseButton {
    static defaultProps = {
        containerStyle: ButtonAddVideoStyles.container,
        style: ButtonAddVideoStyles.text,
    };
    render() {
        return super.render();
    }
}

export class ButtonPublish extends BaseButton {
    static defaultProps = {
        containerStyle: ButtonPublishStyles.container,
        style: ButtonPublishStyles.text,
    };
    render() {
        return super.render();
    }
}

export class ButtonMeal extends BaseButton {
    render() {
        return super.render();
    }
}

export class ButtonSearch extends BaseButton {
    render() {
        return super.render();
    }
}


export class ButtonEditRecipe extends BaseButton {
    static defaultProps = {
        containerStyle: ButtonEditStyles.container,
        style: ButtonEditStyles.text,
    };
    render() {
        return super.render();
    }
}

