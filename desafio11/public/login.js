function formLogin(){
    const form=document.getElementById('formLogin')
    form.innerHTML=`<form id="formLogIn">
    <div class="mb-3">
        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="nombre" name="nombre">
    </div>
    <button class="btn btn-dark">Enviar</button>
</form>`
}

module.exports=formLogin;