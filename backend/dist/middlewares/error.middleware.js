// Este é o seu middleware global que foi extraído do app.js
export function errorHandler(erro, req, res, next) {
    console.error(' [Global Error Handler]:', erro.message || erro);
    const status = erro.status || 500;
    const mensagem = erro.mensagem || 'Ocorreu um erro interno no servidor.';
    return res.status(status).json({
        error: true,
        status,
        message: mensagem
    });
}
