import { BaseButton } from './BaseButton';


import { ButtonStyles, ButtonAddStyles, ButtonAddVideoStyles, ButtonAddInstructionStyles, ButtonPublishStyles} from '@/styles/AddRecipe';
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

export class ButtonAddInstruction extends BaseButton {
    static defaultProps = {
        containerStyle: ButtonAddInstructionStyles.container,
        style: ButtonAddInstructionStyles.text,
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

