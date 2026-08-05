// Hablo lesson library — material from Andy's Spanish teacher.
// Content only, no logic. Lesson "n" is stable forever; append, never renumber.
// Blocks render in order: rule | table | examples (phrase ids) | exercise.
// Content the teacher did not write is labelled as such in its note / en text.
// Validated by test/lessons.test.js.
window.LESSONS = [
  {
    "n": 54,
    "es": "Verbo ser y estar en pasado",
    "en": "Verbs ser and estar in the past tense",
    "cat": "past-ser-estar",
    "blocks": [
      {
        "type": "rule",
        "es": "El verbo ser se usa para estados permanentes o características esenciales.",
        "en": "The verb ser is used for permanent states or essential characteristics."
      },
      {
        "type": "rule",
        "es": "El verbo estar se usa para estados temporales o para la ubicación.",
        "en": "The verb estar is used for temporary states or location."
      },
      {
        "type": "rule",
        "es": "En pasado, ser y estar se traducen igual al inglés: was o were.",
        "en": "In the past tense, both ser and estar translate into English as was or were."
      },
      {
        "type": "table",
        "head": [
          "",
          "Uso"
        ],
        "rows": [
          [
            "Ser",
            "Estados permanentes o características esenciales"
          ],
          [
            "Estar",
            "Estados temporales o ubicación"
          ]
        ],
        "note": "Same ser/estar split you already know in the present, just moved into the past."
      },
      {
        "type": "table",
        "head": [
          "Personal pronouns",
          "Ser",
          "Estar"
        ],
        "rows": [
          [
            "Yo",
            "era",
            "estaba"
          ],
          [
            "Tú",
            "eras",
            "estabas"
          ],
          [
            "Usted",
            "era",
            "estaba"
          ],
          [
            "Él / Ella",
            "era",
            "estaba"
          ],
          [
            "Nosotros",
            "éramos",
            "estábamos"
          ],
          [
            "Ustedes",
            "eran",
            "estaban"
          ],
          [
            "Vosotros",
            "erais",
            "estabais"
          ],
          [
            "Ellos / Ellas",
            "eran",
            "estaban"
          ]
        ],
        "note": "The vosotros row is Spain only - not used in Latin America. In Latin America use the Ustedes row (eran / estaban) for any group of people. Usted is the formal singular you; it takes the same forms as él/ella. Note: her slides write eráis; the standard spelling is erais, without the accent."
      },
      {
        "type": "rule",
        "es": "Para la forma negativa, pon no antes del verbo: Yo no era, Yo no estaba.",
        "en": "For the negative, put no in front of the verb: Yo no era, Yo no estaba (I was not)."
      },
      {
        "type": "rule",
        "es": "Para preguntar puedes decir ¿Eras feliz?, ¿Eras tú feliz? o ¿Tú eras feliz? Las tres son correctas.",
        "en": "To ask a question you can say ¿Eras feliz?, ¿Eras tú feliz? or ¿Tú eras feliz? All three are correct."
      },
      {
        "type": "examples",
        "ids": [
          "p701",
          "p702",
          "p703",
          "p704",
          "p705",
          "p746",
          "p706",
          "p707",
          "p708"
        ]
      },
      {
        "type": "examples",
        "ids": [
          "p709",
          "p710",
          "p711",
          "p712",
          "p713",
          "p714",
          "p715",
          "p747",
          "p716"
        ]
      },
      {
        "type": "examples",
        "ids": [
          "p717",
          "p718",
          "p740",
          "p741",
          "p742"
        ]
      },
      {
        "type": "exercise",
        "prompt": "Choose the right option",
        "items": [
          {
            "q": "Él ______ comiendo en la plaza (era - estaba)",
            "a": "estaba",
            "note": "Progressive actions always take estar."
          },
          {
            "q": "Ella ______ profesora (era - estaba)",
            "a": "era",
            "note": "A profession is an essential characteristic, so ser."
          },
          {
            "q": "La mañana ______ calurosa (éramos - estaba)",
            "a": "estaba",
            "note": "Her two options are éramos and estaba; éramos is impossible because La mañana is singular. Outside this exercise, La mañana era calurosa is also correct Spanish if the mornings were always hot."
          },
          {
            "q": "Nosotros ______ una familia (éramos - estábamos)",
            "a": "éramos",
            "note": ""
          },
          {
            "q": "La niña ______ corriendo (era - estaba)",
            "a": "estaba",
            "note": ""
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Mezcla y combina: pronombre + ser o estar en pasado + adjetivo. Her slide gives three columns (Yo, Él, Nosotros, Ellos, Ustedes, Vosotros / estar, ser / disciplinados, alegres, aburridos, callado, cansados) and lets you pick any combination; the pairings below are one worked set.",
        "items": [
          {
            "q": "Yo + estar + callado",
            "a": "Yo estaba callado.",
            "note": "One valid combination — others work too. callada if you are female"
          },
          {
            "q": "Él + ser + callado",
            "a": "Él era callado.",
            "note": "One valid combination — others work too. ser here means he was a quiet person by nature"
          },
          {
            "q": "Nosotros + estar + cansados",
            "a": "Nosotros estábamos cansados.",
            "note": "One valid combination — others work too. cansadas if the group is all female."
          },
          {
            "q": "Ellos + ser + disciplinados",
            "a": "Ellos eran disciplinados.",
            "note": "One valid combination — others work too. ser here describes what they were like as people."
          },
          {
            "q": "Ustedes + estar + alegres",
            "a": "Ustedes estaban alegres.",
            "note": "One valid combination — others work too. estar because it describes how they felt at the time."
          },
          {
            "q": "Vosotros + estar + aburridos",
            "a": "Vosotros estabais aburridos.",
            "note": "One valid combination — others work too. Spain only. Latin America: Ustedes estaban aburridos."
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Change to past tense",
        "items": [
          {
            "q": "Estoy muy triste.",
            "a": "Estaba muy triste.",
            "note": ""
          },
          {
            "q": "Ella es mi doctora.",
            "a": "Ella era mi doctora.",
            "note": ""
          },
          {
            "q": "Nosotros estamos comiendo en el parque.",
            "a": "Nosotros estábamos comiendo en el parque.",
            "note": ""
          },
          {
            "q": "Él es taxista en Nueva York.",
            "a": "Él era taxista en Nueva York.",
            "note": ""
          },
          {
            "q": "Ellos están escalando la montaña.",
            "a": "Ellos estaban escalando la montaña.",
            "note": ""
          },
          {
            "q": "Somos muy buenos abogados.",
            "a": "Éramos muy buenos abogados.",
            "note": ""
          },
          {
            "q": "Vosotros sois ingenieros.",
            "a": "Vosotros erais ingenieros.",
            "note": "Latin America uses ustedes: Ustedes eran ingenieros."
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Translate these sentences",
        "items": [
          {
            "q": "I was at home last night.",
            "a": "Yo estaba en casa anoche.",
            "note": ""
          },
          {
            "q": "She was in The United States last week.",
            "a": "Ella estaba en Estados Unidos la semana pasada.",
            "note": ""
          },
          {
            "q": "We were invited to the party.",
            "a": "Nosotros estábamos invitados a la fiesta.",
            "note": "Fuimos invitados a la fiesta is also correct and more common."
          },
          {
            "q": "The boy was at the restaurant.",
            "a": "El niño estaba en el restaurante.",
            "note": ""
          },
          {
            "q": "John Lennon was my friend.",
            "a": "John Lennon era mi amigo.",
            "note": ""
          },
          {
            "q": "Scrapy was a dog.",
            "a": "Scrapy era un perro.",
            "note": ""
          },
          {
            "q": "You were her boyfriend.",
            "a": "Tú eras su novio.",
            "note": "informal you"
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Complete the sentences",
        "items": [
          {
            "q": "¿Dónde __________ vosotros el martes?",
            "a": "estabais",
            "note": "Spain form. Latin America: ¿Dónde estaban ustedes el martes?"
          },
          {
            "q": "Cuando mi perro __________ cachorro, tuvo pulgas.",
            "a": "era",
            "note": ""
          },
          {
            "q": "Antes __________ muy buenos amigos, ahora, no tanto",
            "a": "éramos",
            "note": "No subject is given, so eran (ellos/ustedes) is equally correct; erais in Spain. Éramos is the most natural reading."
          },
          {
            "q": "Mi gato __________ flaco, ahora es muy gordo.",
            "a": "era",
            "note": "estaba also works if you mean he was only temporarily thin."
          },
          {
            "q": "Martín __________ en el hospital ayer.",
            "a": "estaba",
            "note": "Location always takes estar."
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Complete in negative form",
        "items": [
          {
            "q": "Carlos y Gabriel __________ compañeros.",
            "a": "no eran",
            "note": ""
          },
          {
            "q": "Vosotros __________ buenos amigos.",
            "a": "no erais",
            "note": "Spain form. Latin America: Ustedes no eran buenos amigos."
          },
          {
            "q": "Tú __________ en la alcaldía.",
            "a": "no estabas",
            "note": ""
          },
          {
            "q": "Él __________ un buen amigo.",
            "a": "no era",
            "note": ""
          },
          {
            "q": "Mis amigos __________ en el parque.",
            "a": "no estaban",
            "note": ""
          },
          {
            "q": "Ustedes __________ en el cine anoche.",
            "a": "no estaban",
            "note": ""
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Write sentences using ser and estar in past tense",
        "items": [
          {
            "q": "Escribe una oración con ser en pasado sobre tu niñez.",
            "a": "",
            "note": "Model answer: Yo era muy tímido cuando era niño."
          },
          {
            "q": "Escribe una oración con estar en pasado sobre dónde estabas ayer.",
            "a": "",
            "note": "Model answer: Ayer yo estaba en la oficina todo el día."
          },
          {
            "q": "Escribe una oración con ser en pasado sobre un amigo.",
            "a": "",
            "note": "Model answer: Mi amigo era el más divertido del grupo."
          },
          {
            "q": "Escribe una oración con estar en pasado usando -ando o -iendo.",
            "a": "",
            "note": "Model answer: Nosotros estábamos viendo una película."
          },
          {
            "q": "Escribe una oración en forma negativa con ser o estar en pasado.",
            "a": "",
            "note": "Model answer: Yo no estaba enojado contigo."
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Tarea 1. Completar con los verbos ser y estar en pasado",
        "items": [
          {
            "q": "Ella __________ en casa ayer por la mañana.",
            "a": "estaba",
            "note": ""
          },
          {
            "q": "Vosotros __________ comiendo pizza.",
            "a": "estabais",
            "note": "Spain form. Latin America: Ustedes estaban comiendo pizza."
          },
          {
            "q": "Nosotras __________ buenas amigas en la escuela.",
            "a": "éramos",
            "note": ""
          },
          {
            "q": "Ustedes __________ en Mónaco hace dos años.",
            "a": "estaban",
            "note": ""
          },
          {
            "q": "Ellos __________ mis profesores en el instituto.",
            "a": "eran",
            "note": ""
          },
          {
            "q": "Él no __________ médico como nosotros.",
            "a": "era",
            "note": ""
          },
          {
            "q": "Yo no __________ hablando contigo.",
            "a": "estaba",
            "note": ""
          },
          {
            "q": "Tú __________ muy popular en el vecindario.",
            "a": "eras",
            "note": "estabas also works if it was only a passing phase."
          },
          {
            "q": "Yo __________ la mejor estudiante de mi clase.",
            "a": "era",
            "note": ""
          },
          {
            "q": "Nosotros __________ juntos.",
            "a": "estábamos",
            "note": "Being together is a state, so estar, not ser."
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Tarea 2. Traducir",
        "items": [
          {
            "q": "You were a good friend:",
            "a": "Tú eras un buen amigo.",
            "note": ""
          },
          {
            "q": "She was here yesterday:",
            "a": "Ella estaba aquí ayer.",
            "note": ""
          },
          {
            "q": "I wasn't eating with you:",
            "a": "Yo no estaba comiendo contigo.",
            "note": ""
          },
          {
            "q": "My girlfriend was a football player:",
            "a": "Mi novia era futbolista.",
            "note": "futbolista is the same word for men and women"
          },
          {
            "q": "I wasn't a good doctor:",
            "a": "Yo no era un buen doctor.",
            "note": "una buena doctora if you are female"
          },
          {
            "q": "You were together yesterday:",
            "a": "Ustedes estaban juntos ayer.",
            "note": "The Spain form would be Vosotros estabais juntos ayer."
          },
          {
            "q": "They were my math teachers:",
            "a": "Ellos eran mis profesores de matemáticas.",
            "note": ""
          },
          {
            "q": "We were watching a movie:",
            "a": "Nosotros estábamos viendo una película.",
            "note": ""
          },
          {
            "q": "My mom was cooking:",
            "a": "Mi mamá estaba cocinando.",
            "note": "mamá is the everyday Latin American word"
          },
          {
            "q": "He was good at math:",
            "a": "Él era bueno en matemáticas.",
            "note": ""
          }
        ]
      }
    ]
  },
  {
    "n": 58,
    "es": "Pasado progresivo",
    "en": "Past progressive",
    "cat": "past-progressive",
    "blocks": [
      {
        "type": "rule",
        "es": "El pasado progresivo se forma con el verbo estar en pasado más el gerundio del verbo principal: estar (pasado) + gerundio.",
        "en": "The past progressive is formed with the verb estar in the past plus the gerund of the main verb: estar (past) + gerund. In English it is was/were + verb -ing."
      },
      {
        "type": "rule",
        "es": "Usamos el pasado progresivo para hablar de una acción que estaba en progreso en un momento del pasado.",
        "en": "We use the past progressive to talk about an action that was in progress at a specific moment in the past."
      },
      {
        "type": "table",
        "head": [
          "Pronombre personal",
          "Verbo estar (pasado)",
          "Gerundio (-ando/-iendo)"
        ],
        "rows": [
          [
            "Yo",
            "estaba",
            "reparando"
          ],
          [
            "Yo",
            "estaba",
            "caminando"
          ]
        ],
        "note": "English pattern: I + was + fixing / walking."
      },
      {
        "type": "table",
        "head": [
          "Pronombre",
          "Estar (pasado)"
        ],
        "rows": [
          [
            "Yo",
            "estaba"
          ],
          [
            "Tú",
            "estabas"
          ],
          [
            "Usted",
            "estaba"
          ],
          [
            "Él, ella",
            "estaba"
          ],
          [
            "Nosotros, nosotras",
            "estábamos"
          ],
          [
            "Ustedes",
            "estaban"
          ],
          [
            "Vosotros",
            "estabais"
          ],
          [
            "Ellos, Ellas",
            "estaban"
          ]
        ],
        "note": "The vosotros row (estabais) is Spain only - not used in Latin America. In Latin America use ustedes estaban for any group you speak to."
      },
      {
        "type": "rule",
        "es": "Primera conjugación: los verbos terminados en -ar forman el gerundio con -ando.",
        "en": "First conjugation: verbs ending in -ar form the gerund with -ando."
      },
      {
        "type": "table",
        "head": [
          "Infinitivo (-ar)",
          "Gerundio (-ando)"
        ],
        "rows": [
          [
            "Cortar",
            "cortando"
          ],
          [
            "Cantar",
            "cantando"
          ],
          [
            "Remar",
            "remando"
          ]
        ],
        "note": ""
      },
      {
        "type": "rule",
        "es": "Segunda y tercera conjugación: los verbos terminados en -er e -ir forman el gerundio con -iendo.",
        "en": "Second and third conjugation: verbs ending in -er and -ir form the gerund with -iendo."
      },
      {
        "type": "table",
        "head": [
          "Infinitivo (-er)",
          "Gerundio (-iendo)"
        ],
        "rows": [
          [
            "Comer",
            "comiendo"
          ],
          [
            "Querer",
            "queriendo"
          ],
          [
            "Crecer",
            "creciendo"
          ],
          [
            "Ver",
            "viendo"
          ]
        ],
        "note": ""
      },
      {
        "type": "table",
        "head": [
          "Infinitivo (-ir)",
          "Gerundio (-iendo)"
        ],
        "rows": [
          [
            "Vivir",
            "viviendo"
          ],
          [
            "Abrir",
            "abriendo"
          ],
          [
            "Partir",
            "partiendo"
          ]
        ],
        "note": ""
      },
      {
        "type": "table",
        "head": [
          "Infinitivo",
          "Gerundio"
        ],
        "rows": [
          [
            "Recordar",
            "recordando"
          ],
          [
            "Dar",
            "dando"
          ],
          [
            "Despertar",
            "despertando"
          ],
          [
            "Llegar",
            "llegando"
          ],
          [
            "Escuchar",
            "escuchando"
          ],
          [
            "Trabajar",
            "trabajando"
          ],
          [
            "Caminar",
            "caminando"
          ],
          [
            "Necesitar",
            "necesitando"
          ],
          [
            "Hacer",
            "haciendo"
          ],
          [
            "Entender",
            "entendiendo"
          ],
          [
            "Saber",
            "sabiendo"
          ],
          [
            "Querer",
            "queriendo"
          ],
          [
            "Creer",
            "creyendo"
          ],
          [
            "Ver",
            "viendo"
          ],
          [
            "Beber",
            "bebiendo"
          ],
          [
            "Sentir",
            "sintiendo"
          ],
          [
            "Decir",
            "diciendo"
          ],
          [
            "Vivir",
            "viviendo"
          ]
        ],
        "note": "Creer, sentir and decir are irregular: creyendo, sintiendo, diciendo."
      },
      {
        "type": "table",
        "head": [
          "Infinitivo",
          "Gerundio irregular"
        ],
        "rows": [
          [
            "Ir",
            "yendo"
          ],
          [
            "Leer",
            "leyendo"
          ],
          [
            "Creer",
            "creyendo"
          ],
          [
            "Mentir",
            "mintiendo"
          ],
          [
            "Sentir",
            "sintiendo"
          ],
          [
            "Decir",
            "diciendo"
          ]
        ],
        "note": "Summary of the irregular gerunds that appear across decks 59 and 60. When the stem ends in a vowel, -iendo becomes -yendo (leer - leyendo). Stem-changing -ir verbs change e to i (mentir - mintiendo, sentir - sintiendo). Note that oler is regular in the gerund: oliendo."
      },
      {
        "type": "rule",
        "es": "Para la forma negativa se pone no antes del verbo estar: Él no estaba entendiendo.",
        "en": "For the negative, put no before the verb estar: He was not understanding."
      },
      {
        "type": "examples",
        "ids": [
          "p748",
          "p752",
          "p749",
          "p750",
          "p751"
        ]
      },
      {
        "type": "table",
        "head": [
          "Pronombre",
          "Descansar (pasado progresivo)"
        ],
        "rows": [
          [
            "Yo",
            "estaba descansando"
          ],
          [
            "Tú",
            "estabas descansando"
          ],
          [
            "Usted",
            "estaba descansando"
          ],
          [
            "Él, ella",
            "estaba descansando"
          ],
          [
            "Nosotros, nosotras",
            "estábamos descansando"
          ],
          [
            "Ustedes",
            "estaban descansando"
          ],
          [
            "Vosotros",
            "estabais descansando"
          ],
          [
            "Ellos, Ellas",
            "estaban descansando"
          ]
        ],
        "note": "Answer key for the blank Descansar table on slide 5 of deck 59 - the slide itself is empty for the student to fill in. The vosotros row (estabais descansando) is Spain only; in Latin America use Ustedes estaban descansando for any group."
      },
      {
        "type": "exercise",
        "prompt": "Mezcla y combina: forma oraciones en pasado progresivo combinando libremente las columnas (Sujetos: El mesero / El profesor / La novia / El amigo / La mamá / Vosotros — Verbos: caminar / hablar / beber / jugar — Complementos: diariamente / en el parque / con Mary / por diversión / hasta tarde / tenis de mesa)",
        "items": [
          {
            "q": "El mesero + estar + caminar + diariamente",
            "a": "El mesero estaba caminando diariamente.",
            "note": "One valid combination — others work too. Una combinación posible; el ejercicio permite otras, p. ej. El mesero estaba caminando en el parque."
          },
          {
            "q": "El profesor + estar + hablar + con Mary",
            "a": "El profesor estaba hablando con Mary.",
            "note": "One valid combination — others work too. Una combinación posible; el ejercicio permite otras, p. ej. El mesero estaba caminando en el parque."
          },
          {
            "q": "La novia + estar + beber + hasta tarde",
            "a": "La novia estaba bebiendo hasta tarde.",
            "note": "One valid combination — others work too. Una combinación posible; el ejercicio permite otras, p. ej. El mesero estaba caminando en el parque."
          },
          {
            "q": "El amigo + estar + jugar + tenis de mesa",
            "a": "El amigo estaba jugando tenis de mesa.",
            "note": "One valid combination — others work too. Una combinación posible; el ejercicio permite otras, p. ej. El mesero estaba caminando en el parque."
          },
          {
            "q": "La mamá + estar + caminar + en el parque",
            "a": "La mamá estaba caminando en el parque.",
            "note": "One valid combination — others work too. Una combinación posible; el ejercicio permite otras, p. ej. El mesero estaba caminando en el parque."
          },
          {
            "q": "Vosotros + estar + jugar + por diversión",
            "a": "Vosotros estabais jugando por diversión.",
            "note": "One valid combination — others work too. Latin America uses ustedes: Ustedes estaban jugando por diversión. Una combinación posible; el ejercicio permite otras, p. ej. El mesero estaba caminando en el parque."
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Conjuga estos verbos en pasado progresivo",
        "items": [
          {
            "q": "Descansar - conjuga las 8 personas",
            "a": "Yo estaba descansando / Tú estabas descansando / Usted estaba descansando / Él, ella estaba descansando / Nosotros, nosotras estábamos descansando / Ustedes estaban descansando / Vosotros estabais descansando / Ellos, ellas estaban descansando",
            "note": "Latin America: use Ustedes estaban descansando for any group; estabais is Spain only."
          },
          {
            "q": "Cortar - conjuga las 8 personas",
            "a": "Yo estaba cortando / Tú estabas cortando / Usted estaba cortando / Él, ella estaba cortando / Nosotros, nosotras estábamos cortando / Ustedes estaban cortando / Vosotros estabais cortando / Ellos, ellas estaban cortando",
            "note": "Latin America: use Ustedes estaban cortando for any group; estabais is Spain only."
          },
          {
            "q": "Correr - conjuga las 8 personas",
            "a": "Yo estaba corriendo / Tú estabas corriendo / Usted estaba corriendo / Él, ella estaba corriendo / Nosotros, nosotras estábamos corriendo / Ustedes estaban corriendo / Vosotros estabais corriendo / Ellos, ellas estaban corriendo",
            "note": "Latin America: use Ustedes estaban corriendo for any group; estabais is Spain only."
          },
          {
            "q": "Leer - conjuga las 8 personas",
            "a": "Yo estaba leyendo / Tú estabas leyendo / Usted estaba leyendo / Él, ella estaba leyendo / Nosotros, nosotras estábamos leyendo / Ustedes estaban leyendo / Vosotros estabais leyendo / Ellos, ellas estaban leyendo",
            "note": "Leer is irregular: leyendo, not leiendo. Latin America: use Ustedes estaban leyendo for any group; estabais is Spain only."
          },
          {
            "q": "Oler - conjuga las 8 personas",
            "a": "Yo estaba oliendo / Tú estabas oliendo / Usted estaba oliendo / Él, ella estaba oliendo / Nosotros, nosotras estábamos oliendo / Ustedes estaban oliendo / Vosotros estabais oliendo / Ellos, ellas estaban oliendo",
            "note": "The gerund of oler is oliendo. Latin America: use Ustedes estaban oliendo for any group; estabais is Spain only."
          },
          {
            "q": "Perder - conjuga las 8 personas",
            "a": "Yo estaba perdiendo / Tú estabas perdiendo / Usted estaba perdiendo / Él, ella estaba perdiendo / Nosotros, nosotras estábamos perdiendo / Ustedes estaban perdiendo / Vosotros estabais perdiendo / Ellos, ellas estaban perdiendo",
            "note": "Latin America: use Ustedes estaban perdiendo for any group; estabais is Spain only."
          },
          {
            "q": "Mentir - conjuga las 8 personas",
            "a": "Yo estaba mintiendo / Tú estabas mintiendo / Usted estaba mintiendo / Él, ella estaba mintiendo / Nosotros, nosotras estábamos mintiendo / Ustedes estaban mintiendo / Vosotros estabais mintiendo / Ellos, ellas estaban mintiendo",
            "note": "The gerund is mintiendo. Latin America: use Ustedes estaban mintiendo for any group; estabais is Spain only."
          },
          {
            "q": "Sufrir - conjuga las 8 personas",
            "a": "Yo estaba sufriendo / Tú estabas sufriendo / Usted estaba sufriendo / Él, ella estaba sufriendo / Nosotros, nosotras estábamos sufriendo / Ustedes estaban sufriendo / Vosotros estabais sufriendo / Ellos, ellas estaban sufriendo",
            "note": "Latin America: use Ustedes estaban sufriendo for any group; estabais is Spain only."
          },
          {
            "q": "Ir - conjuga las 8 personas",
            "a": "Yo estaba yendo / Tú estabas yendo / Usted estaba yendo / Él, ella estaba yendo / Nosotros, nosotras estábamos yendo / Ustedes estaban yendo / Vosotros estabais yendo / Ellos, ellas estaban yendo",
            "note": "The gerund of ir is yendo. Latin America: use Ustedes estaban yendo for any group; estabais is Spain only."
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Conjugate! Escribe el gerundio del verbo entre paréntesis.",
        "items": [
          {
            "q": "Yo estaba ______ (recordar) a los abuelos.",
            "a": "recordando",
            "note": ""
          },
          {
            "q": "Tú estabas ______ (hacer) una fiesta.",
            "a": "haciendo",
            "note": ""
          },
          {
            "q": "Él estaba ______ (despertar) de la siesta.",
            "a": "despertando",
            "note": "Despertándose also works, since waking up is usually reflexive."
          },
          {
            "q": "Ella estaba ______ (dar) la respuesta al examen.",
            "a": "dando",
            "note": ""
          },
          {
            "q": "Nosotros estábamos ______ (caminar) por la recepción.",
            "a": "caminando",
            "note": ""
          },
          {
            "q": "Ustedes estaban ______ (hablar) de organizar una reunión.",
            "a": "hablando",
            "note": ""
          },
          {
            "q": "Ellos estaban ______ (asistir) a clases de guitarra.",
            "a": "asistiendo",
            "note": ""
          },
          {
            "q": "Vosotros estabais ______ (comer) helado en la plaza.",
            "a": "comiendo",
            "note": "Latin America uses ustedes: Ustedes estaban comiendo helado en la plaza."
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Combina: relaciona cada oración con su imagen (1-5)",
        "items": [
          {
            "q": "1. Él estaba comiendo en la plaza.",
            "a": "Imagen 2 (la gente comiendo en la terraza de la plaza)",
            "note": ""
          },
          {
            "q": "2. Él estaba yendo a la casa de los abuelos.",
            "a": "Imagen 1 (los abuelos con la nieta)",
            "note": "The gerund of ir is yendo."
          },
          {
            "q": "3. Vosotros estabais corriendo.",
            "a": "Imagen 3 (las personas corriendo)",
            "note": "Latin America uses ustedes: Ustedes estaban corriendo."
          },
          {
            "q": "4. Él no estaba entendiendo.",
            "a": "Imagen 5 (el hombre confundido con las flechas)",
            "note": "Negative form: no goes before estaba."
          },
          {
            "q": "5. Nosotros estábamos trabajando.",
            "a": "Imagen 4 (el equipo reunido en la mesa)",
            "note": ""
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Answer using the options (Tomar agua / Comprar pizza / Estudiar español / Hacer una fiesta / La clase de español)",
        "items": [
          {
            "q": "¿Qué estaba haciendo tu papá anoche?",
            "a": "Mi papá estaba tomando agua.",
            "note": "Estudiar español also works: Mi papá estaba estudiando español."
          },
          {
            "q": "¿Qué estaban haciendo tus amigos del trabajo?",
            "a": "Mis amigos estaban haciendo una fiesta.",
            "note": ""
          },
          {
            "q": "¿Qué estaban comprando anoche?",
            "a": "Estaban comprando pizza.",
            "note": "Nosotros estábamos comprando pizza also works if the question is aimed at you and your group."
          },
          {
            "q": "¿Qué estaba recordando ella esta mañana?",
            "a": "Ella estaba recordando la clase de español.",
            "note": ""
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "What were they doing? Describe cada imagen en pasado progresivo.",
        "items": [
          {
            "q": "Imagen 1: el hombre enojado señalando",
            "a": "El hombre estaba gritando.",
            "note": "Picture prompt — described from her slide. One valid combination — others work too. Respuesta modelo; cualquier oración correcta en pasado progresivo sirve."
          },
          {
            "q": "Imagen 2: la muchacha frente al refrigerador",
            "a": "Ella estaba buscando algo en el refrigerador.",
            "note": "Picture prompt — described from her slide. One valid combination — others work too. Refrigerador in Mexico; nevera in the Caribbean. Respuesta modelo; cualquier oración correcta en pasado progresivo sirve."
          },
          {
            "q": "Imagen 3: el hombre en el boliche",
            "a": "Él estaba jugando boliche.",
            "note": "Picture prompt — described from her slide. One valid combination — others work too. Boliche = bowling in Mexico and much of Latin America. Respuesta modelo; cualquier oración correcta en pasado progresivo sirve."
          },
          {
            "q": "Imagen 4: el hombre en la piscina",
            "a": "Él estaba nadando en la piscina.",
            "note": "Picture prompt — described from her slide. One valid combination — others work too. Piscina is general; alberca in Mexico. Respuesta modelo; cualquier oración correcta en pasado progresivo sirve."
          },
          {
            "q": "Imagen 5: la pareja limpiando la cocina",
            "a": "Ellos estaban limpiando la cocina.",
            "note": "Picture prompt — described from her slide. One valid combination — others work too. Respuesta modelo; cualquier oración correcta en pasado progresivo sirve."
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Write sentences in past progressive (escribe cinco oraciones tuyas)",
        "items": [
          {
            "q": "1. ______________________________",
            "a": "",
            "note": "Model: Yo estaba leyendo un libro muy bueno."
          },
          {
            "q": "2. ______________________________",
            "a": "",
            "note": "Model: Mi hermano estaba nadando en la piscina."
          },
          {
            "q": "3. ______________________________",
            "a": "",
            "note": "Model: Nosotros estábamos trabajando hasta tarde."
          },
          {
            "q": "4. ______________________________",
            "a": "",
            "note": "Model: Ustedes estaban bebiendo jugo de naranja."
          },
          {
            "q": "5. ______________________________",
            "a": "",
            "note": "Try a negative sentence. Model: Yo no estaba entendiendo nada."
          }
        ]
      }
    ]
  },
  {
    "n": 61,
    "es": "Preposiciones de Lugar",
    "en": "Prepositions of Place",
    "cat": "prepositions-place",
    "blocks": [
      {
        "type": "rule",
        "es": "Las preposiciones de lugar dicen dónde está una cosa o una persona. Casi siempre se usan con el verbo estar: La pelota está encima de la caja.",
        "en": "Prepositions of place tell where a thing or a person is. They are almost always used with the verb estar: La pelota está encima de la caja (The ball is on top of the box)."
      },
      {
        "type": "table",
        "head": [
          "Preposición",
          "English",
          "Ejemplo"
        ],
        "rows": [
          [
            "En / dentro de",
            "in / inside",
            "El perro está dentro de la caja."
          ],
          [
            "Sobre / encima de",
            "on / on top of",
            "La pelota está encima de la caja."
          ],
          [
            "Al lado de",
            "next to / beside",
            "El banco está al lado de la farmacia."
          ],
          [
            "Detrás de",
            "behind",
            "La pelota está detrás de la caja."
          ],
          [
            "En frente de",
            "in front of / across from",
            "La tienda está en frente de mi casa."
          ],
          [
            "En la esquina",
            "on / in the corner",
            "El restaurante está en la esquina de la calle."
          ],
          [
            "En medio de",
            "in the middle of / between",
            "Él está en medio de los niños."
          ],
          [
            "Debajo de",
            "under / underneath",
            "El gato está debajo de la cama."
          ]
        ],
        "note": "The prepositions and their order are the teacher's list exactly as it appears on her slides. Only two of the examples are hers (El perro está dentro de la caja; Él está en medio de los niños); the rest are added. All of it is standard Latin American Spanish; enfrente de is also written as one word."
      },
      {
        "type": "rule",
        "es": "Casi todas estas preposiciones terminan en de. Cuando de va antes de el, las dos palabras se combinan: de + el = del. Detrás de + el edificio = detrás del edificio.",
        "en": "Almost all of these prepositions end in de. When de comes before el, the two words contract: de + el = del. Detrás de + el edificio = detrás del edificio (behind the building)."
      },
      {
        "type": "rule",
        "es": "Sobre y encima de significan lo mismo. En y dentro de también son intercambiables, pero dentro de es más específico: subraya que algo está adentro.",
        "en": "Sobre and encima de mean the same thing (on / on top of). En and dentro de are also interchangeable, but dentro de is more specific: it stresses that something is inside."
      },
      {
        "type": "rule",
        "es": "En frente de puede significar 'in front of' o 'across from'. En la esquina se usa para la esquina de una calle; para el rincón interior de un cuarto o de una caja, lo normal es decir en el rincón, aunque la maestra rotula esa imagen como en la esquina.",
        "en": "En frente de can mean either 'in front of' or 'across from'. En la esquina is used for a street corner; for the inside corner of a room or a box the standard word is rincón (en el rincón), though the teacher labels that picture en la esquina."
      },
      {
        "type": "table",
        "head": [
          "Preposición",
          "English",
          "Ejemplo"
        ],
        "rows": [
          [
            "Entre",
            "between",
            "Mi casa está entre la escuela y el parque."
          ],
          [
            "Cerca de",
            "near / close to",
            "El supermercado está cerca de la estación."
          ],
          [
            "Lejos de",
            "far from",
            "Mi oficina está lejos del centro."
          ],
          [
            "Arriba de",
            "above / on top of",
            "La lámpara está arriba del sofá."
          ],
          [
            "Delante de",
            "in front of (ahead of)",
            "Mi hermano está delante de mí."
          ],
          [
            "Alrededor de",
            "around",
            "Los niños juegan alrededor del árbol."
          ],
          [
            "Junto a",
            "right next to",
            "Siéntate junto a mí, por favor."
          ]
        ],
        "note": "They come up constantly and pair naturally with her list. All are standard Latin American Spanish."
      },
      {
        "type": "examples",
        "ids": [
          "p792",
          "p793",
          "p794",
          "p795",
          "p797",
          "p798",
          "p799",
          "p800"
        ]
      },
      {
        "type": "examples",
        "ids": [
          "p803",
          "p806",
          "p817",
          "p820",
          "p828"
        ]
      },
      {
        "type": "exercise",
        "prompt": "Let's practice! Di dónde está la pelota (o la caja) en cada imagen. (Say where the ball — or the box — is in each picture.)",
        "items": [
          {
            "q": "Picture 1 - the ball is on top of the box",
            "a": "La pelota está encima de la caja.",
            "note": "Picture prompt — described from her slide. La pelota está sobre la caja is equally correct."
          },
          {
            "q": "Picture 2 - the ball is under the box",
            "a": "La pelota está debajo de la caja.",
            "note": "Picture prompt — described from her slide. Debajo de la caja is the natural answer here."
          },
          {
            "q": "Picture 3 - the ball is in front of the box",
            "a": "La pelota está en frente de la caja.",
            "note": "Picture prompt — described from her slide. Delante de la caja also works."
          },
          {
            "q": "Picture 4 - the ball is beside the box",
            "a": "La pelota está al lado de la caja.",
            "note": "Picture prompt — described from her slide. Junto a la caja also works."
          },
          {
            "q": "Picture 5 - the ball is behind the box",
            "a": "La pelota está detrás de la caja.",
            "note": "Picture prompt — described from her slide. Atrás de la caja is also heard in Latin America."
          },
          {
            "q": "Picture 6 - the ball is inside the box",
            "a": "La pelota está dentro de la caja.",
            "note": "Picture prompt — described from her slide. La pelota está en la caja also works."
          },
          {
            "q": "Picture 7 - there is a ball on each side of the box",
            "a": "La caja está en medio de las dos pelotas.",
            "note": "Picture prompt — described from her slide. Entre las dos pelotas also works."
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Mezcla y combina: forma oraciones con una palabra de cada columna y el verbo estar en presente simple.",
        "items": [
          {
            "q": "La estudiante + estar + al lado de + la mesa",
            "a": "La estudiante está al lado de la mesa.",
            "note": "One valid combination — others work too. La estudiante + al lado de + la mesa, all taken from her columns."
          },
          {
            "q": "El gato + estar + debajo de + la cama",
            "a": "El gato está debajo de la cama.",
            "note": "One valid combination — others work too. El gato + debajo de + la cama, all taken from her columns."
          },
          {
            "q": "Mi hermano + estar + en frente de + la ventana",
            "a": "Mi hermano está en frente de la ventana.",
            "note": "One valid combination — others work too. Mi hermano + en frente de + la ventana, all taken from her columns."
          },
          {
            "q": "La pelota + estar + detrás de + la silla",
            "a": "La pelota está detrás de la silla.",
            "note": "One valid combination — others work too. La pelota + detrás de + la silla, all taken from her columns."
          },
          {
            "q": "Los lentes + estar + en medio de + la mesa",
            "a": "Los lentes están en medio de la mesa.",
            "note": "One valid combination — others work too. Lentes is plural, so the verb is están."
          },
          {
            "q": "Escribe dos oraciones más combinando las columnas de otra manera.",
            "a": "",
            "note": "Not on the teacher's slide; added practice. Any grammatical combination of the four columns is correct."
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Tarea: preposiciones de lugar. Crear oraciones escogiendo una opción de cada columna a la vez. (Las respuestas de abajo son solo un modelo: muchas otras combinaciones son igualmente correctas.)",
        "items": [
          {
            "q": "1) El teléfono está",
            "a": "El teléfono está encima de la cama.",
            "note": "One valid combination — others work too. Column 2 encima + column 3 de la cama."
          },
          {
            "q": "2) La casa está",
            "a": "La casa está al lado de la escuela.",
            "note": "One valid combination — others work too. Column 2 al lado + column 3 de la escuela."
          },
          {
            "q": "3) La escuela está",
            "a": "La escuela está en la esquina de la calle.",
            "note": "One valid combination — others work too. Column 2 en la esquina + column 3 de la calle."
          },
          {
            "q": "4) El banco está",
            "a": "El banco está detrás del edificio azul.",
            "note": "One valid combination — others work too. Detrás de + el edificio azul contracts to detrás del edificio azul."
          },
          {
            "q": "5) La ropa está",
            "a": "La ropa está en la tienda.",
            "note": "One valid combination — others work too. Column 3 la tienda has no de, so it pairs with en or sobre."
          },
          {
            "q": "6) El TV está",
            "a": "El TV está en frente de la cama.",
            "note": "One valid combination — others work too. La tele or el televisor is more common than el TV in everyday Latin American speech."
          },
          {
            "q": "7) Las llaves están",
            "a": "Las llaves están dentro de mi bolso.",
            "note": "One valid combination — others work too. Dentro (column 2) + de mi bolso (column 3). En mi bolso is also correct Spanish, but it does not use column 3's de mi bolso as written."
          },
          {
            "q": "8) La computadora está",
            "a": "La computadora está sobre la mesa.",
            "note": "One valid combination — others work too. Sobre (column 2) + la mesa (column 3). Encima de la mesa is also correct Spanish, but column 3's la mesa has no de, so encima cannot pair with it directly."
          },
          {
            "q": "9) *El jardín está",
            "a": "El jardín está en medio del arbusto y la fuente.",
            "note": "One valid combination — others work too. En medio de + el arbusto contracts to en medio del arbusto."
          },
          {
            "q": "10) *El hospital",
            "a": "El hospital está en frente de la escuela.",
            "note": "One valid combination — others work too. Her column 1 leaves out está here; add it to make a complete sentence."
          }
        ]
      }
    ]
  },
  {
    "n": 66,
    "es": "Cada, todo, ambos, cualquiera y ninguno",
    "en": "Each, all, both, either, any, neither",
    "cat": "quantifiers",
    "blocks": [
      {
        "type": "rule",
        "es": "Estas palabras sirven para hablar de cosas, personas y lugares dentro de un grupo.",
        "en": "These words are used to talk about things, people and places within a group."
      },
      {
        "type": "rule",
        "es": "Cada se refiere a los miembros de un grupo uno por uno y nunca cambia de género ni de número: cada casa, cada día, cada estudiante.",
        "en": "Cada means each/every. It points at the members of a group one by one and never changes for gender or number: cada casa, cada día, cada estudiante."
      },
      {
        "type": "rule",
        "es": "Todos y todas se refieren al grupo completo: Todas las casas tienen un árbol.",
        "en": "Todos and todas refer to the entire group: All the houses have a tree."
      },
      {
        "type": "rule",
        "es": "Todo y toda delante de un sustantivo singular significan completo: Él hace ejercicio todo el día = el día completo.",
        "en": "Todo and toda before a singular noun mean whole or entire: He exercises all day = the whole day."
      },
      {
        "type": "rule",
        "es": "Ambos y ambas significan los dos y solo se usan cuando hay exactamente dos cosas: Quiero ambos.",
        "en": "Ambos and ambas mean both, and are only used when there are exactly two items: I want both."
      },
      {
        "type": "rule",
        "es": "Cualquier va delante del sustantivo (Cualquier anillo me gusta) y cualquiera va solo o con de (Cualquiera de las tres camisas te queda bien).",
        "en": "Cualquier goes directly before a noun (I like any ring); cualquiera stands alone or with de (Any of the three shirts looks good on you)."
      },
      {
        "type": "rule",
        "es": "Ninguno y ninguna significan que nadie o nada del grupo cumple con lo que se dice: Ninguna de las copas tiene vino. Delante de un sustantivo masculino se usa ningún: ningún vaso.",
        "en": "Ninguno and ninguna mean that no one or nothing in the group qualifies: None of the glasses has wine. Before a masculine noun it shortens to ningún: ningún vaso."
      },
      {
        "type": "rule",
        "es": "Cuando ninguno va después del verbo, hay que poner no delante del verbo: Se acabaron los dulces, no queda ninguno.",
        "en": "When ninguno comes after the verb, Spanish requires no before the verb: The candy is gone, there is none left."
      },
      {
        "type": "table",
        "head": [
          "",
          "Singular",
          "Plural",
          "English"
        ],
        "rows": [
          [
            "Cada",
            "cada",
            "no plural form",
            "each / every"
          ],
          [
            "Todo",
            "todo / toda",
            "todos / todas",
            "all / whole / every"
          ],
          [
            "Ambos",
            "no singular form",
            "ambos / ambas",
            "both"
          ],
          [
            "Cualquiera",
            "cualquier / cualquiera",
            "cualesquiera (rare)",
            "any / either"
          ],
          [
            "Ninguno",
            "ningún / ninguno / ninguna",
            "rarely used in plural",
            "none / neither / not any"
          ]
        ],
        "note": "Cada never changes for gender or number. Ninguno shortens to ningún before a masculine noun. Ambos always refers to exactly two."
      },
      {
        "type": "table",
        "head": [
          "All, each, both, none",
          "Words",
          "Verbs (simple present)",
          "Adjectives"
        ],
        "rows": [
          [
            "Ningún (o)",
            "vasos",
            "estar",
            "limpio"
          ],
          [
            "Cualquier (a)",
            "vestidos",
            "ser",
            "bonito"
          ],
          [
            "Ambos (as)",
            "manzanas",
            "",
            "verde"
          ],
          [
            "Cada",
            "copas",
            "",
            "brillante"
          ],
          [
            "",
            "plato",
            "",
            "completo"
          ]
        ],
        "note": "Her Mezcla y combina drill: take one item from each column and build a sentence, e.g. Ambos vasos están limpios."
      },
      {
        "type": "examples",
        "ids": [
          "p831",
          "p839",
          "p840",
          "p841",
          "p851",
          "p859",
          "p860",
          "p866"
        ]
      },
      {
        "type": "examples",
        "ids": [
          "p834",
          "p845",
          "p854",
          "p863",
          "p868",
          "p870"
        ]
      },
      {
        "type": "exercise",
        "prompt": "Let's practice! Complete the sentences",
        "items": [
          {
            "q": "¿Puedes comer ______ una pizza?",
            "a": "toda",
            "note": "Toda una pizza = a whole pizza."
          },
          {
            "q": "¿Tú caminas _______ los fines de semana?",
            "a": "todos",
            "note": "Cada fin de semana also works, but then the noun goes singular."
          },
          {
            "q": "¿Qué haces ______ día?",
            "a": "cada",
            "note": "Only cada fits this blank as printed. ¿Qué haces todo el día? is a valid sentence but you have to add el, and it changes the meaning to all day long."
          },
          {
            "q": "¿Prefieres las manzanas verdes, rojas o _______?",
            "a": "ambas",
            "note": "ninguna also works if the answer is neither."
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Mezcla y combina - build a sentence with one item from each column",
        "items": [
          {
            "q": "Ningún (o) + vasos + estar + limpio",
            "a": "Ningún vaso está limpio.",
            "note": "One valid combination — others work too. Ninguno shortens to ningún before a masculine noun, and that noun must be singular, so vasos becomes vaso. Keeping her plural also works: Ninguno de los vasos está limpio."
          },
          {
            "q": "Cualquier (a) + vestidos + ser + bonito",
            "a": "Cualquier vestido es bonito.",
            "note": "One valid combination — others work too. Cualquier is always followed by a singular noun."
          },
          {
            "q": "Ambos (as) + manzanas + estar + verde",
            "a": "Ambas manzanas están verdes.",
            "note": "One valid combination — others work too. With estar, verde means unripe: Ambas manzanas están verdes = both apples are not ripe yet. If you mean the color, pick ser from her verb column: Ambas manzanas son verdes."
          },
          {
            "q": "Cada + copas + ser + brillante",
            "a": "Cada copa es brillante.",
            "note": "One valid combination — others work too. Cada is always followed by a singular noun."
          },
          {
            "q": "Ningún (o) + plato + estar + completo",
            "a": "Ningún plato está completo.",
            "note": "One valid combination — others work too. Ninguno shortens to ningún before the masculine singular plato."
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Complete the sentences using: cada/todo/ambos/cualquier/ninguno",
        "items": [
          {
            "q": "Los dos salen a trabajar temprano, ________ necesitan un despertador.",
            "a": "ambos",
            "note": ""
          },
          {
            "q": "Nadie sabe nada del caso, _________ sospechoso puede ser el culpable.",
            "a": "cualquier",
            "note": ""
          },
          {
            "q": "________ día cuando me levanto salgo a caminar.",
            "a": "Cada",
            "note": "Todos would need the plural noun: Todos los días."
          },
          {
            "q": "________ de sus amigos falta nunca a su fiesta de cumpleaños.",
            "a": "Ninguno",
            "note": "The double negative with nunca is normal and correct in Spanish."
          },
          {
            "q": "Pasa _____ el día estudiando porque los exámenes están difíciles.",
            "a": "todo",
            "note": "Todo el día = the whole day."
          },
          {
            "q": "A ________ participante se le asigna una tarea específica.",
            "a": "cada",
            "note": ""
          },
          {
            "q": "_______ libro tiene el nombre en la etiqueta.",
            "a": "Cada",
            "note": "Todo libro also works and sounds more formal."
          },
          {
            "q": "Son dos pasteles, ________ cuestan $1.",
            "a": "ambos",
            "note": ""
          },
          {
            "q": "__________ inconveniente, recuerda avisar en recepción.",
            "a": "Ante cualquier",
            "note": "The quantifier before inconveniente is cualquier, but the sentence needs the preposition ante in front of it: Ante cualquier inconveniente, recuerda avisar en recepción."
          },
          {
            "q": "Se acabaron los dulces, no queda _________.",
            "a": "ninguno",
            "note": ""
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Look at the picture and answer the questions using: cualquiera, ninguno, todos, ambos.",
        "items": [
          {
            "q": "¿Quiénes comen pizza?",
            "a": "Todos comen pizza.",
            "note": "Her picture shows four friends sharing pizza."
          },
          {
            "q": "¿Comen pizza o conversan?",
            "a": "Ambas cosas: comen pizza y conversan.",
            "note": ""
          },
          {
            "q": "¿Cuántos llevan puesto un sombrero?",
            "a": "Ninguno lleva puesto un sombrero.",
            "note": ""
          },
          {
            "q": "¿Quién paga la cuenta?",
            "a": "Cualquiera puede pagar la cuenta.",
            "note": ""
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Make sentences using the information below",
        "items": [
          {
            "q": "(Todos)",
            "a": "Todos los estudiantes leen libros en la biblioteca.",
            "note": "Picture prompt — described from her slide. Her picture shows four students studying together."
          },
          {
            "q": "(Ambos)",
            "a": "Ambos perros corren detrás de la pelota.",
            "note": "Picture prompt — described from her slide. Her picture shows two dogs running with a ball."
          },
          {
            "q": "(Cada)",
            "a": "Cada uno de los amigos salta al mar.",
            "note": "Picture prompt — described from her slide. Her picture shows a group of friends jumping into the sea."
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Tarea 1: Escribir oraciones con las siguientes palabras",
        "items": [
          {
            "q": "Cada:",
            "a": "",
            "note": "Model: Cada día tomo café a las siete."
          },
          {
            "q": "Todo:",
            "a": "",
            "note": "Model: Todo el mundo quiere ser feliz."
          },
          {
            "q": "Toda:",
            "a": "",
            "note": "Model: Toda la clase aprobó el examen."
          },
          {
            "q": "Todos:",
            "a": "",
            "note": "Model: Todos mis amigos juegan fútbol."
          },
          {
            "q": "Todas:",
            "a": "",
            "note": "Model: Todas las tiendas cierran a las nueve."
          },
          {
            "q": "Ambos:",
            "a": "",
            "note": "Model: Ambos hermanos viven en México."
          },
          {
            "q": "Ambas:",
            "a": "",
            "note": "Model: Ambas hermanas estudian medicina."
          },
          {
            "q": "Ningún:",
            "a": "",
            "note": "Model: Ningún restaurante abre los lunes."
          },
          {
            "q": "Ninguno:",
            "a": "",
            "note": "Model: Ninguno de mis primos habla inglés."
          },
          {
            "q": "Ninguna:",
            "a": "",
            "note": "Model: Ninguna de las copas tiene vino."
          },
          {
            "q": "Cualquier:",
            "a": "",
            "note": "Model: Cualquier anillo me gusta."
          },
          {
            "q": "Cualquiera:",
            "a": "",
            "note": "Model: Cualquiera puede aprender español."
          }
        ]
      },
      {
        "type": "exercise",
        "prompt": "Tarea 2: Completar",
        "items": [
          {
            "q": "________ vez que voy al parque, acaricio a los perros.",
            "a": "Cada",
            "note": ""
          },
          {
            "q": "________ mis amigos están en Alemania.",
            "a": "Todos",
            "note": ""
          },
          {
            "q": "No quiero ver ________ de televisión, estoy cansado.",
            "a": "nada",
            "note": "Her sheet prints the blank directly before televisión; ninguna televisión there would mean not a single TV set. The everyday Latin American sentence adds de: No quiero ver nada de televisión, estoy cansado."
          },
          {
            "q": "Traje pizza vegetariana y de jamón porque sé que te gustan ________.",
            "a": "ambas",
            "note": "Ambas because pizza is feminine."
          },
          {
            "q": "Estuve despierta ________ la noche.",
            "a": "toda",
            "note": "Despierta for a woman; a man would say despierto."
          },
          {
            "q": "________ mis amigos están en el instituto.",
            "a": "Todos",
            "note": ""
          },
          {
            "q": "No tengo tiempo para cocinar, voy a comer ________ cosa.",
            "a": "cualquier",
            "note": ""
          },
          {
            "q": "En este restaurante, puedo comer ________ lo que quiera.",
            "a": "todo",
            "note": ""
          }
        ]
      }
    ]
  }
];
