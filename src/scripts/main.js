/* Declaraciones */
// Direcciones
    const d = document
    const url = 'http://localhost:3001'
// Navegacion
    const menuBtn = d.querySelector('nav .btn')
    const menuLst = d.querySelector('nav .menu')
    const links = menuLst.querySelectorAll('a')
// Formularios
    const form = d.querySelector('#form')
    const formData = d.querySelector('.fields')
    const select = d.querySelectorAll('.selection label')
    const actions = d.querySelectorAll('.selection input')
    const fields = {
        users: `
            <label for="user_name">Nombre de Usuario</label>
            <input 
                id="user_name"
                name="user_name"
                minlength="3"
                maxlength="20"
                type="text"
                placeholder="Nombre(*): c215714n"
                required>
            <div class="valid">
                Ingrese un nombre que posea entre 3 y 20 caracteres
            </div>
            <label for="user_email">Correo Electronico</label>
            <input
                id="user_email"
                name="user_email"
                type="email"
                placeholder="Correo(*): cristiandracedo@hotmail.com"
                required>
            <div class="valid">
                Ingrese una direccion de correo Valida
            </div>
            <label for="user_password">Ingrese su Contraseña</label>
            <input 
                id="user_password"
                name="user_password"
                type="password"
                placeholder="Contraseña(*): ****"
                required>
            <div class="valid"> 
                Ingrese una contraseña con mayusculas minusculas y numeros
            </div>
            <label for="user_passcheck">Repita la Contraseña</label>
            <input
                id="user_passcheck" 
                type="password"
                placeholder="Repetir Contraseña(*): ****"
                required>
            <div class="valid">
                Las contraseñas deben coincidir para validar el envio
            </div>
        `, 
        products:`
            <label for="category">Categorias</label>
            <input 
                id="category" 
                name="category"
                list="cat_id"
                placeholder="Elija una Categoria"
                required>
            <datalist id="cat_id">
            </datalist>
            <label for="product">Productos</label>
            <input 
                id="product" 
                name="product" 
                list="product_id"
                placeholder="Elija un Producto"
                required>
            <datalist id="product_id">
            </datalist>
        `, 
        posts:`
            <label for="post_title">Titulo</label>
            <input id="post_title" type="text">
            <label for="post_description">Descripcion</label>
            <textarea id="post_description"></textarea>
            <label for="product">Producto</label>
            <select id="product">
            </select>
            <label for="price">precio</label>
            <input id="price" type="number">
            <label for="quantity">cantidad</label>
            <input id="quantity" type="number">
        `, 
        sales:`
            <label for="price">precio</label>
            <input id="price" type="number">
            <label for="quantity">cantidad</label>
            <input id="quantity" type="number">
        `
    }
// Tabla de datos
    const table = d.querySelector('table')
    const tCap = d.querySelector('table caption')
    const tHead = table.querySelector('thead tr')
    const tBody = table.querySelector('tbody')

/* Funciones y metodos */
// Consulta de datos
    const fetchData = (section) => {
        fetch(`${url}/${section}`)
        .then(response => response.json())
        .then(data => updateTable(data, section))
    }
//  Menu Hamburguesa
    menuBtn.onclick = () => menuLst.classList.toggle('active') ? menuBtn.classList.replace('icon-bars', 'icon-cross') : menuBtn.classList.replace('icon-cross','icon-bars')
// Carga de Datos
    links.forEach(a => a.onclick = (e) => { 
        let data = a.href.split('#')[1]
        e.preventDefault(); 
        fetchData(data);
        formData.innerHTML = fields[data]
    }   )
//  Carga de Metodos
    select.forEach( (s,i) => s.onclick = () => form.setAttribute('method', actions[i].value )  )
//  Actualizacion de Tabla
    const updateTable = (data, caption) => { 
        const title = Object.keys(data[0])
        emptyTable(); 
        tC(caption)
        tH(title)
        tR(data,title)
        tBody.innerHTML = tBody.innerHTML.replaceAll  (',','')
    }
    const emptyTable = () => (tHead.innerHTML='',  tBody.innerHTML='')
    const tC = (cap) => tCap.innerHTML = `Detalle de la tabla ${cap}`
    const tH = (title) => title.map(t => tHead.innerHTML+=`<th>${t}</th>`)
    const tR = (row,i) => row.map(r => tBody.innerHTML+=`<tr>${tD(r,i)}`)
    const tD = (cel, k) => k.map(c => `<td>${cel[c]}</td>`)