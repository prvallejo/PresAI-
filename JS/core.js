/**
 * PresAi Core - Maestro de Orquesta
 * Gestiona licencias, proyectos y navegación global.
 */

const PresAi = {
    // 1. Configuración de Módulos
    modulos: ['presupuesto', 'compras', 'solar', 'facturacion'],

    // 2. Inicialización
    init: function() {
        console.log("PresAi Core: Iniciando viga maestra...");
        this.renderHeader();
        this.verificarAccesoGlobal();
    },

    // 3. Gestión de Proyectos (Memoria de la Obra)
    setProyecto: function(nombre, id) {
        localStorage.setItem('presai_proyecto_nombre', nombre);
        localStorage.setItem('presai_proyecto_id', id);
        console.log(`Proyecto fijado: ${nombre} (ID: ${id})`);
    },

    getProyecto: function() {
        return {
            nombre: localStorage.getItem('presai_proyecto_nombre') || 'Sin nombre',
            id: localStorage.getItem('presai_proyecto_id') || '000'
        };
    },

    // 4. Maestro de Interfaz (Dibuja el menú en todas las páginas)
    renderHeader: function() {
        const headerContainer = document.getElementById('main-header');
        if (!headerContainer) return;

        headerContainer.innerHTML = `
            <header style="background: #1e3a5f; color: white; padding: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <div class="logo" style="font-weight: bold; font-size: 1.2rem;">PresAi <span style="font-weight: 300; font-size: 0.8rem;">v1.0</span></div>
                <nav>
                    <ul style="list-style: none; display: flex; gap: 15px;">
                        <li><a href="index.html" style="color: white; text-decoration: none;">Inicio</a></li>
                        <li><a href="presupuesto.html" style="color: white; text-decoration: none;">Presupuesto</a></li>
                        <li><a href="compras.html" style="color: white; text-decoration: none;">Compras</a></li>
                        <li><a href="solar.html" style="color: white; text-decoration: none;">Solar</a></li>
                    </ul>
                </nav>
                <div id="proyecto-info" style="font-size: 0.8rem; background: rgba(255,255,255,0.1); padding: 5px 10px; border-radius: 4px;">
                    Obra: ${this.getProyecto().nombre}
                </div>
            </header>
        `;
    },

    // 5. El Guardián (Pre-verificación de licencias)
    verificarAccesoGlobal: function() {
        const path = window.location.pathname;
        // Detectar en qué página estamos para saber qué licencia pedir
        let moduloActual = '';
        if (path.includes('presupuesto')) moduloActual = 'presupuesto';
        if (path.includes('compras')) moduloActual = 'compras';
        if (path.includes('solar')) moduloActual = 'solar';

        if (moduloActual !== '') {
            const licencia = localStorage.getItem(`presai_key_${moduloActual}`);
            if (!licencia) {
                console.warn(`Alerta: Módulo ${moduloActual} no activado.`);
                // Aquí en el Paso 3 dispararemos el Modal
            }
        }
    }
};

// Arrancar el core cuando cargue el DOM
document.addEventListener('DOMContentLoaded', () => PresAi.init());

