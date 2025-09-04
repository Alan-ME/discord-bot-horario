const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();

// Usar variables de entorno o config.json como fallback
const token = process.env.DISCORD_TOKEN || require('./config.json').token;
const prefix = process.env.PREFIX || require('./config.json').prefix;

const horarioData = require('./horario.json');

// Crear el cliente del bot con intents básicos
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Funciones para el horario escolar
function obtenerDiaSemana() {
    const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    return dias[new Date().getDay()];
}

function obtenerHorarioDelDia(dia) {
    return horarioData.horario[dia] || [];
}

function formatearHorario(horario) {
    if (horario.length === 0) {
        return '🎉 **¡No tienes clases hoy!** ¡Disfruta tu día libre!';
    }
    
    let texto = '';
    horario.forEach((clase) => {
        texto += `${horarioData.configuracion.emojiHora} **${clase.hora}** - ${horarioData.configuracion.emojiMateria} **${clase.materia}**\n`;
        texto += `   ${horarioData.configuracion.emojiProfesor} ${clase.profesor} | ${horarioData.configuracion.emojiAula} ${clase.aula}\n\n`;
    });
    return texto;
}

// Evento cuando el bot se conecta
client.once('ready', () => {
    console.log(`✅ Bot conectado como ${client.user.tag}!`);
    console.log(`📊 Servidores: ${client.guilds.cache.size}`);
    console.log(`👥 Usuarios: ${client.users.cache.size}`);
    console.log(`🌐 Ejecutándose en Railway!`);
    
    // Establecer estado del bot
    client.user.setActivity('📚 Recordando tu horario escolar', { type: 'WATCHING' });
    
    console.log('🎉 ¡Bot listo para usar 24/7!');
});

// Evento para manejar mensajes
client.on('messageCreate', async (message) => {
    // Ignorar mensajes de bots
    if (message.author.bot) return;
    
    // Verificar si el mensaje empieza con el prefijo
    if (!message.content.startsWith(prefix)) return;
    
    // Separar comando y argumentos
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    // Comandos básicos
    switch (commandName) {
        case 'ping':
            const sent = await message.reply('🏓 Calculando ping...');
            const timeDiff = sent.createdTimestamp - message.createdTimestamp;
            sent.edit(`🏓 **Pong!** Latencia: ${timeDiff}ms | API: ${Math.round(client.ws.ping)}ms`);
            break;
            
        case 'ayuda':
        case 'help':
            const helpEmbed = new EmbedBuilder()
                .setTitle('🤖 Comandos del Bot')
                .setDescription('Lista de comandos disponibles:')
                .setColor('#0099ff')
                .addFields(
                    { name: `${prefix}ping`, value: 'Muestra la latencia del bot', inline: true },
                    { name: `${prefix}ayuda`, value: 'Muestra esta lista de comandos', inline: true },
                    { name: `${prefix}horario`, value: 'Muestra tu horario de hoy', inline: true },
                    { name: `${prefix}horario <día>`, value: 'Muestra horario de un día específico', inline: true },
                    { name: `${prefix}proximaclase`, value: 'Muestra tu próxima clase', inline: true },
                    { name: `${prefix}status`, value: 'Estado del bot en Railway', inline: true }
                )
                .setFooter({ text: `Solicitado por ${message.author.tag}` })
                .setTimestamp();
            
            message.reply({ embeds: [helpEmbed] });
            break;
            
        case 'horario':
            const diaSolicitado = args[0] ? args[0].toLowerCase() : obtenerDiaSemana();
            const horarioDelDia = obtenerHorarioDelDia(diaSolicitado);
            
            const horarioEmbed = new EmbedBuilder()
                .setTitle(`📅 Horario de ${diaSolicitado.charAt(0).toUpperCase() + diaSolicitado.slice(1)}`)
                .setDescription('Aquí tienes tu horario:')
                .setColor('#0099ff')
                .addFields({
                    name: '📚 Clases:',
                    value: formatearHorario(horarioDelDia)
                })
                .setFooter({ text: `Solicitado por ${message.author.tag}` })
                .setTimestamp();
            
            message.reply({ embeds: [horarioEmbed] });
            break;
            
        case 'proximaclase':
            const diaActual = obtenerDiaSemana();
            const horarioActual = obtenerHorarioDelDia(diaActual);
            const ahora = new Date();
            const horaActual = ahora.getHours().toString().padStart(2, '0') + ':' + ahora.getMinutes().toString().padStart(2, '0');
            
            let proximaClase = null;
            let proximaClaseHoy = false;
            
            // Buscar próxima clase de hoy
            for (const clase of horarioActual) {
                if (clase.hora > horaActual) {
                    proximaClase = clase;
                    proximaClaseHoy = true;
                    break;
                }
            }
            
            // Si no hay más clases hoy, buscar la primera de mañana
            if (!proximaClase) {
                const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
                const diaActualIndex = dias.indexOf(diaActual);
                
                for (let i = 1; i <= 7; i++) {
                    const siguienteDiaIndex = (diaActualIndex + i) % 7;
                    const siguienteDia = dias[siguienteDiaIndex];
                    const horarioSiguienteDia = obtenerHorarioDelDia(siguienteDia);
                    
                    if (horarioSiguienteDia.length > 0) {
                        proximaClase = horarioSiguienteDia[0];
                        proximaClaseHoy = false;
                        break;
                    }
                }
            }
            
            if (proximaClase) {
                const proximaEmbed = new EmbedBuilder()
                    .setTitle('⏰ Tu próxima clase')
                    .setColor('#ff9900')
                    .addFields(
                        { name: '📚 Materia', value: proximaClase.materia, inline: true },
                        { name: '🕐 Hora', value: proximaClase.hora, inline: true },
                        { name: '👨‍🏫 Profesor', value: proximaClase.profesor, inline: true },
                        { name: '🏫 Aula', value: proximaClase.aula, inline: true },
                        { name: '📅 Día', value: proximaClaseHoy ? 'Hoy' : 'Próximo día con clases', inline: true }
                    )
                    .setFooter({ text: `Solicitado por ${message.author.tag}` })
                    .setTimestamp();
                
                message.reply({ embeds: [proximaEmbed] });
            } else {
                message.reply('🎉 ¡No tienes más clases programadas! ¡Disfruta tu tiempo libre!');
            }
            break;
            
        case 'status':
            const statusEmbed = new EmbedBuilder()
                .setTitle('🚀 Estado del Bot')
                .setColor('#00ff00')
                .addFields(
                    { name: '🌐 Hosting', value: 'Railway (24/7)', inline: true },
                    { name: '⏱️ Uptime', value: `${Math.floor(process.uptime())} segundos`, inline: true },
                    { name: '💾 Memoria', value: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`, inline: true },
                    { name: '📊 Servidores', value: `${client.guilds.cache.size}`, inline: true },
                    { name: '👥 Usuarios', value: `${client.users.cache.size}`, inline: true },
                    { name: '🏓 Ping', value: `${client.ws.ping}ms`, inline: true }
                )
                .setFooter({ text: 'Bot funcionando en Railway' })
                .setTimestamp();
            
            message.reply({ embeds: [statusEmbed] });
            break;
            
        default:
            message.reply(`❌ Comando no encontrado. Usa \`${prefix}ayuda\` para ver los comandos disponibles.`);
    }
});

// Manejo de errores
client.on('error', console.error);
process.on('unhandledRejection', error => {
    console.error('Error no manejado:', error);
});

// Conectar el bot
client.login(token);
