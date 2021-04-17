Querida Ana, 

Felicitaciones por tan hermoso trabajo. Que gustazo ver el nivel de detalle y atencion que pusiste en el maquetado: todos los cambios que agregaste mejoran el modelo original. Como siempre, la calidad visual de tus trabajos reflejan un nivel de compromiso y talento muy destacable, muy por encima de tu experiencia. 

A nivel visual, quiza te comentaria algunos detalles. 
Me gustaria tener un indicador claro de que los botones estan deshabilitados. Esta bueno que desparezcan los de next y previous en primera y ultima pagina, pero en la primera querria no poder apretar el primero, y en la ultima querria no poder apretar el ultimo. Fijate bien tu logica para deshabilitar botones pero, primero y principal, dales un estilado propio a los botones deshabilitados. Es un indicador visual super importante - para el usuario viendo tu pagina, y para vos arreglandola. 

En celulares pequeños se ve mal el detalle del personaje - hay un margen muy grande en la descripcion:  `margin: 40px 0 40px 80px` Te recomiendo ver eso. La lupa en responsive tampoco se ve bien, y no entiendo la decision de separar la lupa del texto usando muchos espacios en HTML:  nunca usamos HTML para crear estilos. Separa el texto de la lupa aumentando el `padding-left` a tu input. 

A nivel comportamiento, varias cositas que no funcionan como debieran. Hay botones no se deshabilitan cuando lo espero (puedo, por ejemplo, ir infinitamente a la primera pagina cuando ya estoy en la primera pagina). 
Cuando quiero ver el detalle de personajes, noto un montón de fetch para traerme los comics de ese personaje. Eso puede volver lenta tu pagina si son muchos, y no es necesario porque podemos traernos todos esos comics a la vez con collectionURI

Si trato de ordenar los comics por mas antiguo, todo funciona: pero si busco un personaje en particular y quiero ordenar por mas antiguo, la web se rompe. Nota la url si quisiera buscar "hulk" y "mas antiguos":
`https://gateway.marvel.com/v1/public/comics?-focDateStartsWith=hulk&orderBy=-focDate&apikey=5b28d7dfab933cb0faf686ed9e76a30a`

Hay ahi un "focDate" que no deberia estar y rompe todo. 

En el modelo, cuando elegimos entre comics/personajes, el select de opciones cambia. Eso es porque no hay busqueda por "mas antiguos" cuando queremos personajes. en tu web este select no cambia, por lo que, ademas del problema de mas arriba con las busquedas, tampoco funcionan todas las busquedas de personajes. 

No se bien si comentarte una o varias de estas cosas en mas detalle. Tengo entendido que lo que te faltó fue tiempo, y no que no pudieras hacer estas cosas, pero en caso de que hayas tenido una traba de tipo tecnico para poder resolver estas cosas, no dejes de consultarme.

Con respecto a tu HTML, veo algunas desprolijidades que te deje comentadas, pero en general hay buen uso de etiquetas semanticas, impecable form y preocupacion por accesibilidad. Tu Sass esta algo desaprovechado: si bien me demuestra que entendiste los conceptos vistos, hay muy pocas variables, muy pocos mixins, y ningun intento de aplicar arquitectura. Todo lo que es font, todo lo que es tamaños, todo lo que es margenes, etc, deberia estar en alguna variable. Eso incluye los estilos mobile. Separar los estilos en archivos para cada componente lo hace mucho mas mantenible. 
 
Tu JS esta muy bien. Usas correctamente los conocimientos vistos a lo largo del modulo, tu codigo en general es prolijo y bien funcionalizado. Quiza algunas funciones son un poco mas complejas de lo que me gustaria, es dificil a veces entender que es lo que queres hacer. Te dejé algunos comentarios en cosas que no entendía: si vos misma no podes explicar por qué las hiciste asi, quiza haya que pensar en modificar estas funciones para que sean mas claras. 

Con respecto a tu github, celebro que hayas ido trabajando correctamente commit a commit y que tengas varias branches. Quiza quieras mencionar en tu readme que el usuario va a tener que tener LiveServer para ejecutarlo en local. 

En definitiva, veo faltantes y algunas desprolijidades pero creo que en general se explican por falta de tiempo, no de talento, ganas o capacidad. Te diria que, si tenes el tiempo y las ganas, la dediques en primer lugar a dejar tu trabajo funcional, sin los errores de comportamiento que te aclaro, ya que es un hermoso trabajo y vale la pena que lo difundas. 

Con respecto a los restantes factores de evaluacion, 

 
  ✅ Respeta la consigna
  ✅ Respeta el diseño dado
  ✔️ Respeta el funcionamiento
  ✅ Responsive funciona correctamente

  ✅ HTML semántico
  ✅ Código bien indentado
  ✅ Buenos nombres de clases
  ✅ Buenos nombres de funciones y variables
  ✔️ Uso de variables (SASS)

  ❌ Buena estructura y separación de archivos (SASS)
  ✅ Correcto uso de estilos anidados (SASS)
  ✅  Nombres de branchs adecuados

  ❌ Componentización de estilos (SASS)
  ✅ Funciones pequeñas
  ✅ Lógica clara y simple
  ✅ Separación clara de manejo de datos y visualización

  ✅ Reutilización de lógica / funciones
  ✅ Commits con mensajes adecuados

Nota final: **8**


