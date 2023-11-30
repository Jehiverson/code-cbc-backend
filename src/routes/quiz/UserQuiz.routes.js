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
    console.log("GET DATOS", userQuiz)
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
    console.log("GET DATOS", userQuiz)
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

  // const usersByArea = await User.findAll({
  //   attributes: ['idArea', [Sequelize.fn('COUNT', Sequelize.col('idUser')), 'total']],
  //   group: ['idArea']
  // });

  const usersByArea = await Area.findAll({
    attributes: ['name', [Sequelize.fn('COUNT', Sequelize.col('Agencies.User.idUser')), 'total_usuarios']],
    include: [
      {
        model: Agency,
        attributes: [],
        include: [
          {
            model: User,
            attributes: []
          }
        ]
      }
    ],
    group: ['Area.idArea', 'Area.name']
  });

  res.status(200).send({
    totaInscritos: data,
    activeUsers: countUniqueUsers[0],
    aproved: dataResultsAproved,
    reproved: dataResultsReproved,
    usersByArea
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
          Sequelize.literal('COUNT(CASE WHEN "User->UserQuiz"."aproved" = 1 THEN 1 END)'),
          'aproved',
        ],
        [
          Sequelize.literal('COUNT(CASE WHEN "User->UserQuiz"."aproved" = 0 THEN 1 END)'),
          'reproved',
        ],
      ],
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
    const usersByArea = await Area.findAll({
      attributes: [
        'name',
        [Sequelize.fn('COUNT', Sequelize.col('Agencies.User.idUser')), 'total_users']
      ],
      include: [
        {
          model: Agency,
          attributes: [],
          include: [
            {
              model: User,
              attributes: [],
              duplicating: false,
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

routes.get("/general/results/division/area", async (req, res) => {
  try {
    let query = `SELECT
    [Division].[name] AS 'division_name',
    [User->Agency->Area].[name] AS 'area_name',
    COUNT(CASE WHEN "User->UserQuiz"."aproved" = 1 THEN 1 END) AS 'approved',
    COUNT(CASE WHEN "User->UserQuiz"."aproved" = 0 THEN 1 END) AS 'reproved'
      FROM
        [Division] AS [Division]
      LEFT OUTER JOIN
        [User] AS [User] ON [Division].[idDivision] = [User].[idDivision]
      LEFT OUTER JOIN
        [UserQuiz] AS [User->UserQuiz] ON [User].[idUser] = [User->UserQuiz].[idUser]
      LEFT OUTER JOIN
        [Agency] AS [User->Agency] ON [User].[idAgency] = [User->Agency].[idAgency]
      LEFT OUTER JOIN
        [Area] AS [User->Agency->Area] ON [User->Agency].[idArea] = [User->Agency->Area].[idArea]
      GROUP BY
        [Division].[idDivision],
        [Division].[name],
        [User->Agency->Area].[name],
        [User->Agency->Area].[idArea];
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
            {
              model: Quiz,
              include: [
                {model: UserScoreQuiz}
              ]
            }
          ]
        }
      ]
    })
    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Algo salio mal", error})
  }
})


export default routes;