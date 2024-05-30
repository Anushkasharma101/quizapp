import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  quizData: {
    total_questions: 0,
    date: "",
    questions: [],
  },
  creatingQuiz: false,
  createQuizError: null,
};

export const createQuiz = createAsyncThunk(
  "quiz/createQuiz",
  async (quizData, thunkAPI) => {
    const response = await fetch("https://quizapp-backend-yctp.onrender.com/quiz/create-quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`
      },
      body: JSON.stringify(quizData),
    });

    if (!response.ok) {
      throw new Error("Failed to create quiz");
    }

    return await response.json();
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    updateQuizData(state, action) {
      state.quizData = { ...state.quizData, ...action.payload };
    },
    resetQuizData(state) {
      state.quizData = {...initialState.quizData};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuiz.pending, (state) => {
        state.creatingQuiz = true;
        state.createQuizError = null;
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.creatingQuiz = false;
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.creatingQuiz = false;
        state.createQuizError = action.error.message;
      });
  },
});

export const { updateQuizData, resetQuizData } = quizSlice.actions;
export default quizSlice.reducer;
