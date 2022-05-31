
const timeLineMousePosition = (
    event: any,
    //   timelineAreaElement: any,
    mediaObjectAreaElement: any
    //   timelineScrollElement: any
  ) => {
    const clientX = event.clientX;
    const clientY = event.clientY;
  
    const mediaObjectAreaElementBoundingClientRect =
      mediaObjectAreaElement.current.getBoundingClientRect();
  
    const mediaObjectElementLeft = mediaObjectAreaElementBoundingClientRect.left;
    const mediaObjectElementTop = mediaObjectAreaElementBoundingClientRect.top;
  
    //   const timelineAreaElementBoundingClientRect =
    //     timelineAreaElement.current.getBoundingClientRect();
  
    //   const areaElementLeft = timelineAreaElementBoundingClientRect.left;
    //   const areaElementTop = timelineAreaElementBoundingClientRect.top;
  
    //   const timelineScrollElementBoundingClientRect =
    //     timelineScrollElement.current.getBoundingClientRect();
  
    //   const scrollElementLeft = timelineScrollElementBoundingClientRect.left;
    //   const scrollElementTop = timelineScrollElementBoundingClientRect.top;
  
    const mouseAreaX = clientX - mediaObjectElementLeft;
    const mouseAreaY = clientY - mediaObjectElementTop;
    //   console.log(mouseAreaX, mouseAreaY);
  
    return [mouseAreaX, mouseAreaY];
  };
  export default timeLineMousePosition;
