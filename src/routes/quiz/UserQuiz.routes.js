import { Router as expressRouter } from "express";
import UserQuiz from "../../bd/models/UserQuiz.model.js";
import User from "../../bd/models/User.model.js";
import Quiz from "../../bd/models/Quiz.model.js";
import { Sequelize } from "sequelize";
import Area from "../../bd/models/Area.model.js";
import Agency from "../../bd/models/Agency.model.js";
import Division from "../../bd/models/Division.model.js";
import { config } from "../../bd/functions/connect.js";
import UserScoreQuiz from "../../bd/models/UserScoreQuiz.model.js";

const routes = expressRouter();

routes.post('/user-quiz', async (req, res) => {
  try {
    console.log(req.body);
    const userQuiz = await UserQuiz.create(req.body);
    res.status(201).send(userQuiz);
  } catch (error) {
    res.status(400).send(error);
  }
});

routes.get('/user-quiz', async (req, res) => {
  try {
    const userQuizzes = await UserQuiz.findAll({
      include: [User, Quiz]
    });
    res.status(200).send(userQuizzes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT: Update a user quiz
routes.put('/user-quiz/:idUSer/:idQuiz', async (req, res) => {
  try {
    const updated = await UserQuiz.update(req.body, {
      where: { idUser: req.params.idUSer, idQuiz: req.params.idQuiz }
    });

    if (updated) {
      const updatedUserQuiz = await UserQuiz.findByPk(req.params.id, {
        include: [User, Quiz]
      });
      res.status(200).send(updatedUserQuiz);
    } else {
      res.status(404).send({ message: 'User Quiz not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE: Delete a user quiz
routes.delete('/user-quiz/:id', async (req, res) => {
  try {
    const deleted = await UserQuiz.destroy({
      where: { idUserQuiz: req.params.id }
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: 'User Quiz not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.get('/user/:idUser/quiz/:idQuiz', async (req, res) => {
  try {
    const userQuiz = await UserQuiz.findAll({
      where: {
        idUser: req.params.idUser,
        idQuiz: req.params.idQuiz,
      },
    });
    // console.log("GET DATOS", userQuiz)
    res.status(200).send(userQuiz);
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.get('/user/:idUser/quiz/:idQuiz/aproved', async (req, res) => {
  try {
    const userQuiz = await UserQuiz.findAll({
      where: {
        idUser: req.params.idUser,
        idQuiz: req.params.idQuiz,
        aproved: 1
      },
    });
    // console.log("GET DATOS", userQuiz)
    res.status(200).send(userQuiz);
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.get("/general/pie", async (req, res) => {
  const data = await User.count({where: {state: "Activo"}});
  const countUniqueUsers = await UserQuiz.findAll({
    attributes: [
      [Sequelize.literal('COUNT(DISTINCT "idUser")'), 'totalActiveUsers']
    ]
  });
  const dataResultsAproved = await UserQuiz.count({where: {aproved: 1}})
  const dataResultsReproved = await UserQuiz.count({where: {aproved: 0}})

  let query = `SELECT [Area].[name], COUNT([Agencies->User].[idUser]) AS [total_usuarios] FROM [Area] AS [Area] LEFT OUTER JOIN [Agency] AS [Agencies] ON [Area].[idArea] = [Agencies].[idArea] LEFT OUTER JOIN [User] AS [Agencies->User] ON [Agencies].[idAgency] = [Agencies->User].[idAgency] GROUP BY [Area].[name];`

  const usersByArea = await config.query(query)

  res.status(200).send({
    totaInscritos: data,
    activeUsers: countUniqueUsers[0],
    aproved: dataResultsAproved,
    reproved: dataResultsReproved,
    usersByArea: usersByArea[0]
  })
})

routes.get("/general/bar", async (req, res) => {
  const dataResultsAproved = await UserQuiz.count({where: {aproved: 1}})
  const dataResultsReproved = await UserQuiz.count({where: {aproved: 0}})

  res.status(200).send({
    aproved: dataResultsAproved,
    reproved: dataResultsReproved,
  })
})

routes.get("/general/results/division", async (req, res) => {
  try {
    const usersByDivision = await Division.findAll({
      attributes: [
        'name',
        [
          Sequelize.literal('COUNT(CASE WHEN "Areas->Agencies->User->UserQuiz"."aproved" = 1 THEN 1 END)'),
          'aproved',
        ],
        [
          Sequelize.literal('COUNT(CASE WHEN "Areas->Agencies->User->UserQuiz"."aproved" = 0 THEN 1 END)'),
          'reproved',
        ],
      ],
      include: [
        {
          model: Area,
          attributes: [],
          include: [
            {model: Agency,
              attributes: [],
              include: [
                {
                  model: User,
                  attributes: [],
                  include: [
                    {
                      model: UserQuiz,
                      as: 'UserQuiz',
                      attributes: [],
                    },
                  ],
                },
              ]
            }
          ]
        }
      ],
      group: ['Division.idDivision', 'Division.name'],
    });

    res.status(200).send({
      usersByDivision
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Algo salio mal", error})
  }
})

routes.get("/general/results/area", async (req, res) => {
  try {
    const usersByArea = await Area.findAll({
      attributes: [
        'name',
        [
          Sequelize.literal('COUNT(CASE WHEN "Agencies->User->UserQuiz"."aproved" = 1 THEN 1 END)'),
          'aproved',
        ],
        [
          Sequelize.literal('COUNT(CASE WHEN "Agencies->User->UserQuiz"."aproved" = 0 THEN 1 END)'),
          'reproved',
        ],
      ],
      include: [
        {
          model: Agency,
          attributes: [],
          include: [
            {
              model: User,
              attributes: [],
              include: [
                {
                  model: UserQuiz,
                  as: 'UserQuiz',
                  attributes: [],
                },
              ],
            },
          ],
        },
      ],
      group: ['Area.idArea', 'Area.name'],
    });

    res.status(200).send({
      usersByArea
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Algo salio mal", error})
  }
})

routes.get("/general/users/area", async (req, res) => {
  try {
    let query = `SELECT [Area].[name], COUNT([Agencies->User].[idUser]) AS [total_users] FROM [Area] AS [Area] LEFT OUTER JOIN [Agency] AS [Agencies] ON [Area].[idArea] = [Agencies].[idArea] LEFT OUTER JOIN [User] AS [Agencies->User] ON [Agencies].[idAgency] = [Agencies->User].[idAgency] GROUP BY [Area].[name];`
    const usersByArea = await config.query(query);
    console.log("[ asdasd ]", usersByArea)
    res.status(200).send({
      usersByArea: usersByArea[0]
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Algo salio mal", error})
  }
})

routes.get("/general/results/division/area", async (req, res) => {
  try {
    let query = `SELECT
    [Division].[name] AS 'division_name',
    [Area].[name] AS 'area_name',
    COUNT(CASE WHEN "User->UserQuiz"."aproved" = 1 THEN 1 END) AS 'approved',
    COUNT(CASE WHEN "User->UserQuiz"."aproved" = 0 THEN 1 END) AS 'reproved'
      FROM
        [Division] AS [Division]
      LEFT OUTER JOIN
        [Area] AS [Area] ON [Division].[idDivision] = [Area].idDivision
      LEFT OUTER JOIN
        [Agency] AS [User->Agency] ON [Area].[idArea] = [User->Agency].[idArea]
      LEFT OUTER JOIN
        [User] AS [User] ON [User->Agency].[idAgency] = [User].[idAgency]
      LEFT OUTER JOIN
        [UserQuiz] AS [User->UserQuiz] ON [User].[idUser] = [User->UserQuiz].[idUser]
      GROUP BY
        [Division].[idDivision],
        [Division].[name],
        [Area].[name],
        [Area].[idArea];
    `;

    const usersByDivisionAndArea = await config.query(query);
    // Objeto para almacenar los resultados
    const resultObject = {};

    usersByDivisionAndArea[0].forEach((result) => {
      const { division_name, area_name, approved, reproved } = result;
      console.log(result);
      if (!resultObject[division_name]) {
        resultObject[division_name] = [];
      }

      resultObject[division_name].push({ area_name, approved, reproved });
    });

    // Procesar los resultados para cada división
    const finalResult = Object.keys(resultObject).map((division_name) => {
      const areas = resultObject[division_name];
      const uniqueAreas = [...new Set(areas.map((area) => area.area_name))];

      const results = uniqueAreas.map((area_name) => {
        const foundArea = areas.find((area) => area.area_name === area_name);
        if (foundArea) {
          return foundArea;
        } else {
          return { area_name, approved: 0, reproved: 0 };
        }
      });

      return { division_name, results };
    });

    res.status(200).json({ usersByDivisionAndArea: finalResult });
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Algo salio mal", error})
  }
})

routes.get("/general/advence/users", async (req, res) => {
  try {
    const data = await User.findAll({
      include: [
        {
          model: UserQuiz,
          as: "UserQuiz",
          include: [
            {model: Quiz},
            {model: UserScoreQuiz}
          ]
        },
        {model: Agency,
          include: [
            {
              model: Area,
              include: [
                {model: Division}
              ]
            }
          ]
        },
      ]
    })
    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Algo salio mal", error})
  }
})

routes.post("/general/advence/users/area", async (req, res) => {
  try {
    const data = await User.findAll({
      include: [
        {
          model: UserQuiz,
          as: "UserQuiz",
          include: [
            {model: Quiz},
            {model: UserScoreQuiz}
          ]
        },
        {model: Agency,
          include: [
            {
              model: Area,
              include: [
                {model: Division}
              ],
            }
          ]
        },
      ],
      where: {
        '$Agency.Area.name$': req.body.area
      }
    })
    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Algo salio mal", error})
  }
})

routes.get("/center/results/division/:idDivision/area", async (req, res) => {
  try {
    const {idDivision} = req.params;
    let query = `SELECT
    [Division].name as division_name,
    [Area].name as area_name,
    [Agency].name as agency_name,
    COUNT(CASE WHEN "User->UserQuiz"."aproved" = 1 THEN 1 END) AS 'approved',
    COUNT(CASE WHEN "User->UserQuiz"."aproved" = 0 THEN 1 END) AS 'reproved'
      FROM
          [Division] As [Division]
          LEFT OUTER JOIN dbo.Area [Area] on [Division].idDivision = [Area].idDivision
          LEFT OUTER JOIN dbo.Agency [Agency] on [Area].idArea = [Agency].idArea
          LEFT OUTER JOIN [User] AS [User] ON [Agency].[idAgency] = [User].[idAgency]
          LEFT OUTER JOIN [UserQuiz] AS [User->UserQuiz] ON [User].[idUser] = [User->UserQuiz].[idUser]
      WHERE
      [Division].idDivision = ${idDivision}
      GROUP BY
          [Division].name,
          [Area].name,
          [Agency].name`;

    const usersByDivisionAndArea = await config.query(query);

    // Objeto para almacenar los resultados
    const resultObject = {};

    usersByDivisionAndArea[0].forEach((result) => {
      const { division_name, area_name, agency_name, approved, reproved } = result;

      if (!resultObject[division_name]) {
        resultObject[division_name] = [];
      }

      const foundArea = resultObject[division_name].find((area) => area.area_name === area_name);

      if (foundArea) {
        foundArea.agencies.push({ agency_name, approved, reproved });
      } else {
        resultObject[division_name].push({
          area_name,
          agencies: [{ agency_name, approved, reproved }]
        });
      }
    });

    // Procesar los resultados finales
    const finalResult = Object.keys(resultObject).map((division_name) => {
      const areas = resultObject[division_name];
      return { division_name, areas };
    });

    console.log(finalResult);
    res.status(200).send(finalResult);
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Algo salio mal", error})
  }
})

routes.post("/center/results/area/name", async (req, res) => {
  try {
    let query = `SELECT
    [Area].[name],
    COUNT(CASE WHEN "Agencies->User->UserQuiz"."aproved" = 1 THEN 1 END) AS [aproved],
    COUNT(CASE WHEN "Agencies->User->UserQuiz"."aproved" = 0 THEN 1 END) AS [reproved]
    FROM
      [Area] AS [Area]
        LEFT OUTER JOIN [Agency] AS [Agencies] ON [Area].[idArea] = [Agencies].[idArea]
        LEFT OUTER JOIN [User] AS [Agencies->User] ON [Agencies].[idAgency] = [Agencies->User].[idAgency]
        LEFT OUTER JOIN [UserQuiz] AS [Agencies->User->UserQuiz] ON [Agencies->User].[idUser] = [Agencies->User->UserQuiz].[idUser]
      WHERE
      [Area].[name] = '${req.body.area}'
      GROUP BY
      [Area].[name];`;

    const usersByArea = await config.query(query)

    if (usersByArea.length > 0) {
      res.status(200).send(usersByArea[0])
    } else res.status(200).send([])
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Algo salio mal", error})
  }
})

export default routes;