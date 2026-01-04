import React, { forwardRef, type ElementType, type ComponentPropsWithoutRef } from 'react';

export interface SequenceProps<T extends ElementType = 'div'> {
  /**
   * 렌더링할 HTML 태그
   * @default 'div'
   */
  as?: T;
  /**
   * 시퀀스 그룹 이름
   */
  name: string;
  /**
   * 시퀀스 내 인덱스 (0부터 시작)
   * trigger 모드가 아닐 때 필수
   */
  index?: number;
  /**
   * 트리거 모드 - 클릭 시 해당 인덱스 활성화
   * index, 'prev', 'next', 'prev|loop', 'next|loop' 사용 가능
   */
  trigger?: number | 'prev' | 'next' | 'prev|loop' | 'next|loop';
  children?: React.ReactNode;
}

type PolymorphicProps<T extends ElementType> = SequenceProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof SequenceProps<T>>;

/**
 * Sequence - 순차적 애니메이션 시퀀스 요소
 *
 * StringTune의 sequence 모듈을 활용하여 여러 요소의
 * 순차적 애니메이션을 제어합니다.
 *
 * 일반 모드: index를 지정하면 시퀀스 아이템이 됩니다.
 * `-active`, `-entering`, `-leaving` 클래스가 자동으로 토글됩니다.
 *
 * 트리거 모드: trigger를 지정하면 클릭 시 해당 시퀀스를 활성화합니다.
 */
export const Sequence = forwardRef(function Sequence<T extends ElementType = 'div'>(
  { as, name, index, trigger, children, ...props }: PolymorphicProps<T>,
  ref: React.ForwardedRef<Element>
) {
  const Component = as || 'div';

  // 트리거 값 생성
  const triggerValue = trigger !== undefined
    ? typeof trigger === 'number'
      ? `${name}[${trigger}]`
      : `${name}[${trigger}]`
    : undefined;

  // 시퀀스 아이템 값 생성
  const sequenceValue = index !== undefined ? `${name}[${index}]` : undefined;

  return (
    <Component
      ref={ref}
      data-string="sequence"
      {...(sequenceValue && { 'data-string-sequence': sequenceValue })}
      {...(triggerValue && { 'data-string-sequence-trigger': triggerValue })}
      {...props}
    >
      {children}
    </Component>
  );
}) as <T extends ElementType = 'div'>(
  props: PolymorphicProps<T> & { ref?: React.ForwardedRef<Element> }
) => React.ReactElement | null;

export interface SequenceContainerProps<T extends ElementType = 'div'> {
  /**
   * 렌더링할 HTML 태그
   * @default 'div'
   */
  as?: T;
  /**
   * 시퀀스 그룹 이름
   */
  name: string;
  /**
   * 초기 활성 인덱스
   * @default 0
   */
  activeStep?: number;
  /**
   * 진입 애니메이션 지속 시간 (ms)
   */
  enteringDuration?: number;
  /**
   * 이탈 애니메이션 지속 시간 (ms)
   */
  leavingDuration?: number;
  children?: React.ReactNode;
}

type SequenceContainerPolymorphicProps<T extends ElementType> = SequenceContainerProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof SequenceContainerProps<T>>;

/**
 * SequenceContainer - 시퀀스 그룹의 설정을 정의하는 컨테이너
 *
 * 초기 활성 인덱스, 진입/이탈 애니메이션 지속 시간을 설정합니다.
 */
export const SequenceContainer = forwardRef(function SequenceContainer<T extends ElementType = 'div'>(
  { as, name, activeStep = 0, enteringDuration, leavingDuration, children, ...props }: SequenceContainerPolymorphicProps<T>,
  ref: React.ForwardedRef<Element>
) {
  const Component = as || 'div';

  return (
    <Component
      ref={ref}
      data-string="sequence"
      data-string-active-step={`${name}[${activeStep}]`}
      {...(enteringDuration !== undefined && {
        'data-string-entering-duration': `${name}[${enteringDuration}]`,
      })}
      {...(leavingDuration !== undefined && {
        'data-string-leaving-duration': `${name}[${leavingDuration}]`,
      })}
      {...props}
    >
      {children}
    </Component>
  );
}) as <T extends ElementType = 'div'>(
  props: SequenceContainerPolymorphicProps<T> & { ref?: React.ForwardedRef<Element> }
) => React.ReactElement | null;
