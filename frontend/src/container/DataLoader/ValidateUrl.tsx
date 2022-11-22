import * as React from 'react';
import { useAppSelector } from '../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ValidateUrl: React.FC = () => {
  const isDataLoaded = useAppSelector((state) => state.global.dataLoaded);
  const projects = useAppSelector((state) => state.project.projects);
  const domains = useAppSelector((state) => state.domain.domains);

  const navigate = useNavigate();
  const { projectId, domainId } = useParams<{
    projectId: string;
    domainId: string;
  }>();

  const projectExists = projects.find((project) => project.id === projectId);
  const domainExists =
    projectId &&
    domains[projectId] &&
    domains[projectId].find((domain) => domain.id === domainId);

  useEffect(() => {
    if (isDataLoaded && projectId && !projectExists) {
      navigate('/project-not-found');
    }
  }, [projectExists, projectId, navigate, isDataLoaded]);

  useEffect(() => {
    if (isDataLoaded && domainId && !domainExists) {
      navigate('/project-not-found');
    }
  }, [domainExists, domainId, navigate, isDataLoaded]);

  return <></>;
};

export default ValidateUrl;
