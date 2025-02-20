const resize = () => {
    document.querySelectorAll('.modal-field').forEach(mod => {
        mod.classList.toggle('my-modal');
        mod.classList.toggle('my-modal-full');

        const text = mod.getElementsByTagName('button')[0].title;
        const newText = text === "pleine ecran" ? "reduire l'ecran" : "pleine ecran"

        mod.getElementsByTagName('button')[0].title = newText;
    })
}

export default resize