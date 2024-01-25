import { fabric } from 'fabric';
import { useEffect, useRef, useState } from 'react';
import './App.css';

import { Ellipse, Polyline, Rect, Textbox } from 'fabric/fabric-impl';
import { ChoiceOptionContent, HandledProblem } from './types/problem';
import {
  addExistedCircleComponent,
  addExistedGroupComponent,
  addExistedLineComponent,
  addExistedRectComponent,
  addExistedTextComponent,
  addedGroup,
  addedImage,
} from './utils/handleComponent';

import { createIndexedDB } from './data';

function App() {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [currentProblems, setCurrentProblems] = useState<
    HandledProblem[] | null
  >(null);
  const [currentProblemOrder, setCurrentProblemOrder] = useState(0);
  const [countOfCorrect, setCountOfCorrect] = useState(0);

  /**
   * indexedDB 생성
   *
   */
  useEffect(() => {
    createIndexedDB();
  }, []);

  // 데이터 받기
  useEffect(() => {
    // 데이터 받아서 화면에 보여주기
    const handleMessage = (e: MessageEvent) => {
      console.log(e.data);
      setCurrentProblems(e.data);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    canvasRef.current = new fabric.Canvas('game-canvas', {
      width: 900,
      height: 700,
      backgroundColor: '#ffffff',
    });

    const handlePreviewComponent = (
      choiceComponent: ChoiceOptionContent[],
      currentComponentName: string,
      currentTop: number,
      currentLeft: number
    ) => {
      const correctComponentName = choiceComponent.filter(
        component => component.isCorrect === true
      )[0].name;

      let bubbleText: fabric.Text;

      // 정답인 경우
      if (correctComponentName === currentComponentName) {
        bubbleText = new fabric.Text('정답입니다!', {
          fontSize: 20,
          fill: '#0000FF',
          fontFamily: 'SUIT-Regular',
          top: currentTop + 40,
          left: currentLeft,
        });

        canvasRef.current?.add(bubbleText);
      }
      // 오답인 경우
      else {
        bubbleText = new fabric.Text('오답입니다!', {
          fontSize: 20,
          fill: '#E5001A',
          fontFamily: 'SUIT-Regular',
          top: currentTop + 40,
          left: currentLeft,
        });

        canvasRef.current?.add(bubbleText);
      }

      setTimeout(() => {
        if (correctComponentName === currentComponentName) {
          setCountOfCorrect(prevCountOfCorrect => (prevCountOfCorrect += 1));
        } else {
          setCountOfCorrect(prevCountOfCorrect => prevCountOfCorrect || 0);
        }

        canvasRef.current?.remove(bubbleText);
        canvasRef.current?.clear();

        setCurrentProblemOrder(
          prevCurrentProblemOrder => (prevCurrentProblemOrder += 1)
        );
      }, 500);
    };

    /**
     * 문제 생성
     */
    const handleFetchData = async () => {
      if (currentProblems) {
        // 모든 문제를 풀었을 경우 결과 전달
        if (currentProblemOrder >= currentProblems.length) {
          const result = [
            countOfCorrect === 0 ? 0 : countOfCorrect,
            currentProblems[0].id,
          ];

          window.parent.postMessage(result, 'http://localhost:5173');
          return;
        }

        // 화면에 출력
        const { content, choice } =
          currentProblems && currentProblems[currentProblemOrder];

        content.forEach(component => {
          switch (component.info.type) {
            case 'group': {
              const createdGroup = addExistedGroupComponent(
                component.info as addedGroup
              );
              createdGroup.set('name', component.name);
              createdGroup.set('selectable', false);
              createdGroup.set('hoverCursor', 'default');

              if (
                choice.findIndex(
                  targetChoice => targetChoice.name === component.name
                ) !== -1
              ) {
                createdGroup.on('mousedown', () =>
                  handlePreviewComponent(
                    choice,
                    createdGroup.name!,
                    createdGroup.top!,
                    createdGroup.left!
                  )
                );
                createdGroup.set('hoverCursor', 'pointer');
              }

              canvasRef.current?.add(createdGroup as addedGroup);
              canvasRef.current?.requestRenderAll();
              break;
            }

            case 'image': {
              const {
                src,
                top,
                left,
                angle,
                scaleX,
                scaleY,
                strokeWidth,
                strokeDashArray,
              } = component.info as addedImage;
              fabric.Image.fromURL(
                src,
                function (img) {
                  img.set('name', component.name);
                  img.set('top', top);
                  img.set('left', left);

                  // 추가적인 속성에 따른 생성
                  if (angle) {
                    img.set('angle', angle);
                  }
                  if (scaleX) {
                    img.set('scaleX', scaleX);
                    img.set('scaleY', scaleY);
                  }
                  if (strokeWidth) {
                    img.set('strokeWidth', strokeWidth);
                  }
                  if (strokeDashArray) {
                    img.set('strokeDashArray', strokeDashArray);
                  }

                  img.set('selectable', false);
                  img.set('hoverCursor', 'default');

                  if (
                    choice.findIndex(
                      (choice: ChoiceOptionContent) =>
                        choice.name === component.name
                    ) !== -1
                  ) {
                    img.on('mousedown', () =>
                      handlePreviewComponent(
                        choice,
                        img.name!,
                        img.top!,
                        img.left!
                      )
                    );
                    img.set('hoverCursor', 'pointer');
                  }

                  canvasRef.current?.add(img as addedImage);
                  canvasRef.current?.requestRenderAll();
                },
                {
                  crossOrigin: src,
                }
              );
              break;
            }

            case 'text': {
              const createdText = addExistedTextComponent(
                component.info as Textbox
              );

              createdText.set('fontSize', 30);
              createdText.set('name', component.name);
              createdText.set('fontFamily', 'SUIT-Regular');
              createdText.set('selectable', false);
              createdText.set('hoverCursor', 'default');

              if (
                choice.findIndex(
                  (choice: ChoiceOptionContent) =>
                    choice.name === component.name
                ) !== -1
              ) {
                createdText.on('mousedown', () =>
                  handlePreviewComponent(
                    choice,
                    createdText.name!,
                    createdText.top!,
                    createdText.left!
                  )
                );
                createdText.set('hoverCursor', 'pointer');
              }

              canvasRef.current?.add(createdText as Textbox);
              canvasRef.current?.requestRenderAll();

              break;
            }

            case 'rect': {
              const createdRect = addExistedRectComponent(
                component.info as Rect
              );
              createdRect.set('name', component.name);
              createdRect.set('selectable', false);
              createdRect.set('hoverCursor', 'default');

              if (
                choice.findIndex(
                  (choice: ChoiceOptionContent) =>
                    choice.name === component.name
                ) !== -1
              ) {
                createdRect.on('mousedown', () =>
                  handlePreviewComponent(
                    choice,
                    createdRect.name!,
                    createdRect.top!,
                    createdRect.left!
                  )
                );
                createdRect.set('hoverCursor', 'pointer');
              }

              canvasRef.current?.add(createdRect as Rect);
              canvasRef.current?.requestRenderAll();

              break;
            }

            case 'circle': {
              const createdCircle = addExistedCircleComponent(
                component.info as Ellipse
              );
              createdCircle.set('name', component.name);
              createdCircle.set('selectable', false);
              createdCircle.set('hoverCursor', 'default');

              if (
                choice.findIndex(
                  (choice: ChoiceOptionContent) =>
                    choice.name === component.name
                ) !== -1
              ) {
                createdCircle.on('mousedown', () =>
                  handlePreviewComponent(
                    choice,
                    createdCircle.name!,
                    createdCircle.top!,
                    createdCircle.left!
                  )
                );
                createdCircle.set('hoverCursor', 'pointer');
              }

              canvasRef.current?.add(createdCircle as Ellipse);
              canvasRef.current?.requestRenderAll();

              break;
            }

            case 'line': {
              const createdLine = addExistedLineComponent(
                component.info as Polyline
              );
              createdLine.set('name', component.name);
              createdLine.set('selectable', false);
              createdLine.set('hoverCursor', 'default');

              if (
                choice.findIndex(
                  (choice: ChoiceOptionContent) =>
                    choice.name === component.name
                ) !== -1
              ) {
                createdLine.on('mousedown', () =>
                  handlePreviewComponent(
                    choice,
                    createdLine.name!,
                    createdLine.top!,
                    createdLine.left!
                  )
                );
                createdLine.set('hoverCursor', 'pointer');
              }

              canvasRef.current?.add(createdLine as Polyline);
              canvasRef.current?.requestRenderAll();

              break;
            }
            default:
              break;
          }
        });
      }
    };
    handleFetchData();

    return () => {
      if (canvasRef.current !== null) {
        canvasRef.current.dispose();
      }
    };
  }, [countOfCorrect, currentProblemOrder, currentProblems]);

  return (
    <>
      <canvas id="game-canvas"></canvas>
    </>
  );
}

export default App;
