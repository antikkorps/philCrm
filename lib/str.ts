class StringHelper {
    private text: string;

    constructor(text: string) {
        this.text = text;
    }

    singular(): this {
        if (this.text.endsWith('s') && this.text.length > 1) {
            this.text = this.text.slice(0, -1);
        }
        return this;
    }

    singularEn(): this {
        // Règles simples pour les pluriels anglais courants
        if (this.text.endsWith('ies') && this.text.length > 3) {
            this.text = this.text.slice(0, -3) + 'y';
        } else if (this.text.endsWith('es') && this.text.length > 2) {
            this.text = this.text.slice(0, -2);
        } else if (this.text.endsWith('s') && this.text.length > 1) {
            this.text = this.text.slice(0, -1);
        }
        return this;
    }

    capitalize(): this {
        if (!this.text) return this;
        this.text = this.text[0].toUpperCase() + this.text.slice(1);
        return this;
    }

    uppercase(): this {
        this.text = this.text.toUpperCase();
        return this;
    }

    value(): string {
        return this.text;
    }
}

export function str(text: string): StringHelper {
    return new StringHelper(text);
}
