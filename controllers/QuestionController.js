const { UserPackage, UserQuestion, Package } = require('../models');

// Controller function to handle user answering questions and completing package
const answerQuestions = async (req, res) => {
    const { user_id, package_id, answers } = req.body;

    try {
        // Fetch the package to get correct answers
        const packageInfo = await Package.findByPk(package_id);

        if (!packageInfo) {
            return res.status(404).json({ message: 'Package not found' });
        }

        let correctAnswers = 0;
        let incorrectAnswers = 0;

        // Iterate through user answers and compare with correct answers
        for (const answer of answers) {
            const question = await packageInfo.getQuestions({
                where: { id: answer.question_id }
            });

            if (question.length > 0) {
                const correctOption = question[0].correctOption;
                if (correctOption === answer.selected_option) {
                    correctAnswers++;
                } else {
                    incorrectAnswers++;
                }

                // Save user question answer
                await UserQuestion.create({
                    user_package_id: user_id, // Assuming user_package_id is user_id in this case
                    question_id: answer.question_id,
                    selected_option: answer.selected_option
                });
            }
        }

        // Update UserPackage with correct and incorrect answers
        await UserPackage.create({
            user_id,
            package_id,
            correct_answers: correctAnswers,
            incorrect_answers: incorrectAnswers
        });

        return res.status(200).json({
            message: 'Answers saved successfully',
            correct_answers: correctAnswers,
            incorrect_answers: incorrectAnswers
        });
    } catch (error) {
        console.error('Error answering questions:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { answerQuestions };
