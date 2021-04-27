import {mean, times} from 'lodash';
import React, {
  FC,
  memo,
  Profiler,
  ProfilerOnRenderCallback,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const numRows = 40;
const numColumns = 4;
const avgDurationPlaceholder = '–';

const App: FC = () => {
  const renderDurationsRef = useRef<number[]>([]);
  const [avgRenderDuration, setAvgRenderDuration] = useState(
    avgDurationPlaceholder,
  );
  const [renderCount, setRenderCount] = useState(1);

  const rerenderPizzas = useCallback(() => {
    renderDurationsRef.current = [];
    setRenderCount(prevCount => prevCount + 1);
  }, []);

  const onPizzaRender = useCallback(
    (_id: string, _phase: 'mount' | 'update', actualDuration: number) => {
      renderDurationsRef.current.push(actualDuration);
    },
    [],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setAvgRenderDuration(
        renderDurationsRef.current.length
          ? `${mean(renderDurationsRef.current).toPrecision(4)}ms`
          : avgDurationPlaceholder,
      );
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Button title="Rerender Pizzas" onPress={rerenderPizzas} />
        <Text style={styles.isUsingHermes}>
          Using Hermes? {(global as any).HermesInternal ? 'YES' : 'NO'}
        </Text>
        <Text style={styles.avgRenderDuration}>
          Avg Pizza Render Duration: {avgRenderDuration}
        </Text>
        {times(numRows).map(rowIndex => (
          <View style={styles.row} key={rowIndex}>
            {times(numColumns).map(columnIndex => {
              const index = rowIndex * numColumns + columnIndex;
              return (
                <Pizza
                  key={index}
                  index={index}
                  onRender={onPizzaRender}
                  renderCount={renderCount}
                />
              );
            })}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

interface PizzaProps {
  index: number;
  onRender: ProfilerOnRenderCallback;
  renderCount: number;
}

const Pizza: FC<PizzaProps> = memo(({index, onRender, renderCount}) => {
  return (
    <Profiler id={index.toString()} onRender={onRender}>
      <View style={styles.pizzaContainer}>
        <View style={styles.pizzaCrust} />
        <View style={styles.pizzaBase} />
        <View style={styles.pizzaPepperoni1} />
        <View style={styles.pizzaPepperoni2} />
        <View style={styles.pizzaPepperoni3} />
        <Text style={styles.pizzaIndex}>{index}</Text>
        <Text style={styles.pizzaRenderCount}>{renderCount}</Text>
      </View>
    </Profiler>
  );
});

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  isUsingHermes: {
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
  avgRenderDuration: {
    fontSize: 16,
    textAlign: 'center',
  },
  pizzaContainer: {
    height: 50,
    margin: 20,
    position: 'relative',
    transform: [{rotateX: '65deg'}],
    width: 50,
  },
  pizzaBase: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 50,
    borderLeftColor: '#e1d800',
    borderLeftWidth: 50,
    borderRightColor: 'transparent',
    borderRightWidth: 0,
    borderTopColor: 'transparent',
    borderTopWidth: 50,
    left: 7,
    position: 'absolute',
  },
  pizzaCrust: {
    backgroundColor: '#dba24a',
    height: 100,
    position: 'absolute',
    width: 7,
  },
  pizzaPepperoni1: {
    backgroundColor: '#ce0000',
    borderRadius: 15,
    height: 15,
    left: 10,
    position: 'absolute',
    top: 20,
    width: 10,
  },
  pizzaPepperoni2: {
    backgroundColor: '#ce0000',
    borderRadius: 10,
    height: 11,
    left: 35,
    position: 'absolute',
    top: 42,
    width: 6,
  },
  pizzaPepperoni3: {
    backgroundColor: '#ce0000',
    borderRadius: 12,
    height: 12,
    left: 20,
    position: 'absolute',
    top: 60,
    width: 7,
  },
  pizzaIndex: {
    color: '#e12301',
    fontSize: 18,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  pizzaRenderCount: {
    color: '#000000',
    fontSize: 18,
    position: 'absolute',
    right: 0,
    top: 80,
  },
});

export default App;
