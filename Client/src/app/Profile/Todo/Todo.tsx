import React, { FC } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Button, Text } from "../../../components";
import { Feather } from "@expo/vector-icons";
import theme from "../../../components/theme";
import {
  BaseError,
  Todo as _Todo,
  useDeleteTodoMutation,
} from "../../../generated/graphql";
import { NotesList } from "./NotesList";
import { useApolloClient } from "@apollo/client";
import { useGetUser } from "../../../contexts";
import { formatError } from "../../../hooks";

export const Todo: FC<{ todo: _Todo }> = ({ todo }) => {
  const user = useGetUser();
  const { cache } = useApolloClient();
  const [deleteTodo] = useDeleteTodoMutation({
    variables: { id: Number(todo.id) },
  });

  return (
    <View style={styles.container}>
      <View>
        <Text color="secondary" style={{ fontSize: 30 }} fontWeight="bold">
          {todo.title}
        </Text>
        {todo.notes.filter((n) => n !== "").length > 0 ? (
          <NotesList notes={todo.notes} />
        ) : null}
      </View>
      <Button
        style={styles.button}
        onPress={async () => {
          const { data } = await deleteTodo();
          if (data) {
            if (data.deleteTodo.success) {
              const filteredTodos = user.todos.filter((t) => t.id !== todo.id);
              cache.modify({
                id: cache.identify(user),
                fields: {
                  todos() {
                    return filteredTodos;
                  },
                },
              });
            } else {
              alert(formatError(data.deleteTodo.errors as BaseError[]));
            }
          } else {
            alert("Oops something went wrong on our end.");
          }
        }}
        underlayColor="#00000000"
      >
        <Feather name="trash-2" size={24} color="white" />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: theme.colors.logo,
    padding: 10,
    width: Dimensions.get("screen").width - 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#00000000",
    padding: 0,
    alignSelf: "flex-start",
  },
});
