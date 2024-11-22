const pegar_usuario = async (req, res) => {
    try {
        const { email } = req.params;
        if (!email ) {
            res.status(406).send('prencha o campo!')
        }

        const usuario = await User.findOne({ where: { email: email } })

        res.status(200).send(usuario)
    } catch (erro) {
        console.log(erro)
    }
}