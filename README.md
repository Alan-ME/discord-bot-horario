# 🤖 Bot de Discord Personalizado

Un bot de Discord completo con funcionalidades de moderación, información y entretenimiento para tu servidor.

## ✨ Características

- **Comandos básicos**: ping, ayuda, información del servidor y usuarios
- **📚 Sistema de horario escolar**: Recordatorios automáticos diarios de tus clases
- **⏰ Recordatorios inteligentes**: Te recuerda tu horario cada día a la hora que configures
- **📅 Comandos de horario**: Consulta tu horario de cualquier día o tu próxima clase
- **Moderación**: limpiar mensajes, expulsar y banear usuarios
- **Bienvenidas**: Mensajes automáticos cuando alguien se une o sale del servidor
- **Información detallada**: Estadísticas del servidor y perfiles de usuario
- **Interfaz moderna**: Embeds coloridos y atractivos

## 🚀 Instalación

### 1. Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- Una cuenta de Discord
- Un servidor de Discord donde tengas permisos de administrador

### 2. Crear la aplicación del bot

1. Ve a [Discord Developer Portal](https://discord.com/developers/applications)
2. Haz clic en "New Application"
3. Dale un nombre a tu bot
4. Ve a la pestaña "Bot" en el menú lateral
5. Haz clic en "Add Bot"
6. Copia el **Token** del bot (¡guárdalo bien, lo necesitarás!)

### 3. Configurar permisos del bot

En la sección "Bot" del Developer Portal, habilita estos permisos:
- ✅ Send Messages
- ✅ Use Slash Commands
- ✅ Embed Links
- ✅ Attach Files
- ✅ Read Message History
- ✅ Manage Messages
- ✅ Kick Members
- ✅ Ban Members
- ✅ View Channels

### 4. Invitar el bot al servidor

1. Ve a la pestaña "OAuth2" > "URL Generator"
2. Selecciona los scopes: `bot`
3. Selecciona los permisos necesarios (o usa "Administrator" para simplificar)
4. Copia la URL generada y ábrela en tu navegador
5. Selecciona tu servidor y autoriza el bot

### 5. Configurar el proyecto

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   
   Opción A - Usar archivo .env (recomendado):
   ```bash
   # Copia el archivo de ejemplo
   copy config.example.env .env
   
   # Edita el archivo .env y agrega tu token
   DISCORD_TOKEN=tu_token_aqui
   ```

   Opción B - Editar config.json:
   ```bash
   # Edita config.json y reemplaza "tu_token_aqui" con tu token real
   ```

### 6. Ejecutar el bot

```bash
# Modo desarrollo (se reinicia automáticamente al hacer cambios)
npm run dev

# Modo producción
npm start
```

## 📋 Comandos Disponibles

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `!ping` | Muestra la latencia del bot | `!ping` |
| `!ayuda` | Lista todos los comandos disponibles | `!ayuda` |
| `!info` | Información del servidor | `!info` |
| `!usuario @usuario` | Información de un usuario | `!usuario @Juan` |
| `!horario` | Muestra tu horario de hoy | `!horario` |
| `!horario lunes` | Muestra horario de un día específico | `!horario martes` |
| `!proximaclase` | Muestra tu próxima clase | `!proximaclase` |
| `!limpiar 10` | Elimina mensajes (solo moderadores) | `!limpiar 5` |
| `!kick @usuario` | Expulsa a un usuario (solo moderadores) | `!kick @Juan` |
| `!ban @usuario` | Banea a un usuario (solo moderadores) | `!ban @Juan` |

## ⚙️ Configuración Avanzada

### Cambiar el prefijo de comandos

Edita el archivo `config.json`:
```json
{
    "prefix": "tu_prefijo_aqui"
}
```

### Personalizar mensajes de bienvenida

El bot busca canales con estos nombres para enviar mensajes de bienvenida:
- `bienvenida`
- `welcome`
- `general`

Crea un canal con uno de estos nombres o modifica el código en `index.js`.

### 📚 Configurar tu horario escolar

1. **Edita el archivo `horario.json`** con tu horario personal:
   ```json
   {
     "horario": {
       "lunes": [
         {
           "hora": "08:00",
           "materia": "Matemáticas",
           "profesor": "Prof. García",
           "aula": "Aula 201"
         }
       ]
     }
   }
   ```

2. **Configura los recordatorios automáticos**:
   - `horaRecordatorio`: Hora a la que quieres recibir el recordatorio (ej: "07:30")
   - `canalRecordatorios`: Nombre del canal donde se enviarán (ej: "recordatorios-escolares")
   - `mensajePersonalizado`: Mensaje que aparecerá en el recordatorio

3. **Personaliza los emojis**:
   - `emojiMateria`: Emoji para las materias (📚)
   - `emojiHora`: Emoji para las horas (🕐)
   - `emojiAula`: Emoji para las aulas (🏫)
   - `emojiProfesor`: Emoji para los profesores (👨‍🏫)

### ⏰ Recordatorios automáticos

El bot enviará automáticamente tu horario diario a las 7:30 AM (configurable) en el canal que especifiques. Buscará canales con estos nombres:
- `recordatorios-escolares`
- `recordatorios`
- `general`

## 🛠️ Estructura del Proyecto

```
Bot/
├── index.js              # Archivo principal del bot
├── config.json           # Configuración del bot
├── horario.json          # Tu horario escolar personalizado
├── config.example.env    # Ejemplo de variables de entorno
├── package.json          # Dependencias del proyecto
├── .gitignore           # Archivos a ignorar en Git
└── README.md            # Este archivo
```

## 🔧 Solución de Problemas

### El bot no responde a comandos
- Verifica que el token esté correcto
- Asegúrate de que el bot tenga permisos en el canal
- Comprueba que estés usando el prefijo correcto (por defecto `!`)

### Error de permisos
- Verifica que el bot tenga los permisos necesarios
- Asegúrate de que tu rol tenga permisos para usar comandos de moderación

### El bot no se conecta
- Verifica tu conexión a internet
- Comprueba que el token sea válido
- Revisa la consola para mensajes de error

### Los recordatorios no funcionan
- Verifica que el archivo `horario.json` esté bien formateado
- Asegúrate de que existe un canal con el nombre especificado en `canalRecordatorios`
- Comprueba que la hora en `horaRecordatorio` esté en formato "HH:MM" (24 horas)
- Reinicia el bot después de modificar `horario.json`

### Error en comandos de horario
- Verifica que el archivo `horario.json` tenga la estructura correcta
- Asegúrate de que los días estén escritos en minúsculas (lunes, martes, etc.)
- Comprueba que las horas estén en formato "HH:MM"

## 📝 Personalización

### Agregar nuevos comandos

Para agregar un nuevo comando, edita el archivo `index.js` y agrega un nuevo caso en el switch:

```javascript
case 'nuevocomando':
    // Tu código aquí
    message.reply('¡Nuevo comando funcionando!');
    break;
```

### Cambiar colores de embeds

Modifica los colores en los EmbedBuilder:
```javascript
.setColor('#0099ff')  // Azul
.setColor('#00ff00')  // Verde
.setColor('#ff0000')  // Rojo
```

### Personalizar el horario escolar

Para modificar tu horario, edita el archivo `horario.json`:

```json
{
  "horario": {
    "lunes": [
      {
        "hora": "08:00",
        "materia": "Tu materia aquí",
        "profesor": "Nombre del profesor",
        "aula": "Número de aula"
      }
    ]
  },
  "configuracion": {
    "horaRecordatorio": "07:30",
    "canalRecordatorios": "recordatorios-escolares",
    "mensajePersonalizado": "¡Buenos días! Aquí tienes tu horario:"
  }
}
```

**Días disponibles**: lunes, martes, miercoles, jueves, viernes, sabado, domingo

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar el bot:

1. Haz fork del proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la sección de solución de problemas
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

---

¡Disfruta tu nuevo bot de Discord! 🎉
